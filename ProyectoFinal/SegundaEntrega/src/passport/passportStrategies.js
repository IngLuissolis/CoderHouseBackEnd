import passport from 'passport';
import { userModel } from '../dao/models/users.model.js';
import { comparePassword, hashPassword } from "../utils.js";
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2';
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt';

//Estrategia LocalStrategy login
passport.use('login', new LocalStrategy({
    usernameField: 'email'
    , passwordField: 'password'
    , passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const userDB = userModel.findOne({email});
        if (!userDB) {
            return done(null,false);
        }
        const comparePassword = await comparePassword(password, userDB.password);
        if(!comparePassword) {
            return done(null,false);
        }
        done(null, userDB);
    } catch (error) {
        done(error);
    }

}))

//Creamos la estrategia para LocalStrategy
passport.use('registro', new LocalStrategy({
    usernameField: 'email'
    ,passwordField: 'password'
    ,passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await userModel.findOne({email});
    if(user) {
        return done(null,false);
    }
    const hashNewPassword = await hashPassword(password);
    const newUser = {...req.body, password: hashNewPassword};
    const newUserBD = await userModel.create(newUser);
    done(null, newUserBD);
}))

//github strategy
passport.use('github', new GithubStrategy({
    clientID: 'Iv1.2abce53972f45f0d',
    clientSecret: '931348ebe2ef20f52e99ef112d59712ed919c615',
    callbackURL: 'http://localhost:3000/users/github'
}, async (accessToken, refreshToken, profile, done) => {
    const user = await userModel.findOne({email: profile._json.email});
    if (!user){
        const newUser = {
            first_name: profile._json.name.split(' ')[0]
            ,last_name: profile._json.name.split(' ')[1] || ''
            ,email:  profile._json.email
            ,password: 'abcde'
            ,role: 'user'
        }
        const hashNewPassword = await hashPassword(newUser.password);
        newUser.password = hashNewPassword;
        const userDB = await userModel.create(newUser);
        done(null, userDB);
    } else {
        done(null, user);
    }
}))

//jwt Strategy
passport.use('jwt', new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secretJWT'
    }, async (jwt_payload, done) => {
        //console.log(jwt_payload.user);
        done(null, jwt_payload.user);
}))

//jwt Strategy con cookies
const cookieExtractor = (req) => {
    const token = req.cookies.token;
    console.log('token: ', token);
    return token;
}

passport.use('jwtCookies', new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: 'secretJWT'
}, async (jwt_payload, done) => {
    console.log('user: ',jwt_payload.user);
    done(null, jwt_payload.user);
}))

passport.serializeUser((user, done) => {
    done(null, user._id);
});
  
passport.deserializeUser( async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
});
