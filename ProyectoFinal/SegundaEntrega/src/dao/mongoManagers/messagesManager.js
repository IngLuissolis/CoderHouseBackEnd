import { messagesModel } from '../models/messages.model.js';

export default class MessagesManager {

        async getAllMessages() {
            try {
                const messagesDB = await messagesModel.find();
                return messagesDB;
            } catch (error) {
                return error;
            }
        }

        async getMessageById(id) {
            try {
                const messageDB = await messagesModel.findById(id);
                return messageDB;               
            } catch (error) {
                return error;
            }
        }

        async createMessage(message) {
            try {
                const newMessage = await messagesModel.create(message);
                return newMessage;
            } catch (error) {
                return error;
            }
        }
}