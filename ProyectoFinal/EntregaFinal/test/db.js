import mongoose from "mongoose";
import config from "../src/config.js";
import logger from "../src/utils/winston.js";

try {
    await mongoose.connect(config.MONGOURL);
    logger.info("Test - Conectado a MongoDB!!!");
} catch (error) {
    logger.error(error);
}