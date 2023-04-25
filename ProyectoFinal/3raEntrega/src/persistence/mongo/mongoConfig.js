import mongoose from "mongoose";
import config from "../../config.js";

try {
    await mongoose.connect(config.MONGOURL);
    console.log("Conectado a MongoDB!!!");
} catch (error) {
    console.log(error);
}