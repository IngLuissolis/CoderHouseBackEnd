import mongoose from "mongoose";
import config from "../../config.js";
import logger from "../../utils/winston.js";

try {
    await mongoose.connect(config.MONGOURL);
    logger.info("Conectado a MongoDB!!!");
} catch (error) {
    logger.error(error);
}