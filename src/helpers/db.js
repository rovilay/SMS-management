class DB {
    static async findOne(Model, conditions, exclude = '') {
        try {
            const document = await Model.findOne(conditions, exclude);
            return document;
        } catch (error) {
            throw error;
        }
    }

    static async create(Model, conditions) {
        try {
            const newDocument = await Model.create(conditions);
            return newDocument;
        } catch (error) {
            throw error;
        }
    }

    static async findAll(Model, conditions, options) {
        try {
            const documents = await Model.paginate(conditions, options);
            return documents;
        } catch (error) {
            throw error;
        }
    }

    static async updateOne(Model, conditions, data, options) {
        try {
            const updatedDocument = await Model.findOneAndUpdate(conditions, data, options);
            return updatedDocument;
        } catch (error) {
            throw error;
        }
    }

    static async deleteById(Model, id) {
        try {
            await Model.deleteById(id);
        } catch (error) {
            throw error;
        }
    }

    static async deleteAll(Model, conditions) {
        try {
            await Model.deleteMany(conditions);
        } catch (error) {
            throw error;
        }
    }
}

export default DB;
