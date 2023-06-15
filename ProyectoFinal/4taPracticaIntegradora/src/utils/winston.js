import winston from 'winston';
import config from '../config.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const __dirname = dirname(fileURLToPath(import.meta.url));

let logger;

const customLevelsOptions = {
    levels: {
        //Prioridad Maxima cero
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }
    ,colors: {
        fatal: 'red',
        error: 'magenta',
        warning: 'yellow',
        info: 'blue',
        http: 'green',
        debug:'white'
    }
}

if(config.NODE_ENV === 'development') {
    logger = winston.createLogger({
        format: winston.format.combine(
            winston.format.colorize({ colors: customLevelsOptions.colors})
            ,winston.format.simple()
            ,winston.format.timestamp()
        )
        ,levels: customLevelsOptions.levels
        ,transports: [
            new winston.transports.Console({
                level: 'debug',
            })
        ]
    })
} else {
    logger = winston.createLogger({
        levels: customLevelsOptions.levels
        ,format: winston.format.combine(
            winston.format.colorize({ colors: customLevelsOptions.colors})
            ,winston.format.timestamp()
            ,winston.format.prettyPrint()
        )
        ,transports: [
            new winston.transports.Console({
                level: 'info'
            }),
            new winston.transports.File({
                level: 'error',
                filename: `${__dirname}/../logs/errors.log`
            })
        ]
    })
}

export default logger;