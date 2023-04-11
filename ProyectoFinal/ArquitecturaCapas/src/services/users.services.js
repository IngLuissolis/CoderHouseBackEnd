import { createUser, loginUser } from '../persistence/persistence.js';

export async function createUserService(user) {
    
}

export async function loginUserService(user) {
    const userId = await loginUser(user);
    return userId;

}