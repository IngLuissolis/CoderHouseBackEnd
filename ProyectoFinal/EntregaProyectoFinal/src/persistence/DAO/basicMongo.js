export default class BasicMongo {
    constructor(model) {
        this.model = model;
    }

    async create(obj) {
        try {
            const response = await this.model.create(obj);
            return response;
        } catch (error) {
            return console.log(error);
        }
    }

    async findAll() {
        try {
            const response = await this.model.find();
            return response;
        } catch (error) {
            return console.log(error);
        }
    }

    async findOne(id) {
        try {
            const response = await this.model.findById(id);
            return response;
        } catch (error) {
            return console.log(error);
        }
    }

    async deleteOne(id) {
        try {
            const response = await this.model.deleteOne({ _id: id });
            return response;
        } catch (error) {
            return console.log(error);
        }
    }

    async updateOne(id, obj) {
        try {
            const response = await this.model.updateOne({ _id: id }, { $set: obj });
            return response;
        } catch (error) {
            return console.log(error);
        }
    }
}