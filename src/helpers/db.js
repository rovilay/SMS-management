/**
 * Handles operations on DB
 *
 * @exports
 * @class DB
 */
class DB {
    /**
     * Finds a resource in the DB
     *
     * @static
     * @param {*} Model - Model of Collections to query
     * @param {object} conditions - conditions to query the DB
     * @param {string} [exclude=''] - document properties to exclude
     * @returns {object} found document
     * @memberof DB
     */
    static async findOne(Model, conditions, exclude = '') {
        try {
            const document = await Model.findOne(conditions, exclude);
            return document;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Creates new resource in the DB
     *
     * @static
     * @param {*} Model - Model of Collections to query
     * @param {object} conditions - conditions to query the DB
     * @returns {object} new document
     * @memberof DB
     */
    static async create(Model, conditions) {
        try {
            const newDocument = await Model.create(conditions);
            return newDocument;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Finds multiple resources at once in the DB
     *
     * @static
     * @param {*} Model - Model of Collections to query
     * @param {object} conditions - conditions to query the DB
     * @param {object} options - options for the query
     * @returns {Array} found documents
     * @memberof DB
     */
    static async findAll(Model, conditions, options) {
        try {
            const documents = await Model.paginate(conditions, options);
            return documents;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates a rosource in the DB
     *
     * @static
     * @param {*} Model - Model of Collections to query
     * @param {object} conditions - conditions to query the DB
     * @param {*} data - data to update the resource with
     * @param {*} options
     * @returns {object} updated document
     * @memberof DB
     */
    static async updateOne(Model, conditions, data, options) {
        try {
            const updatedDocument = await Model.findOneAndUpdate(conditions, data, options);
            return updatedDocument;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes a resource in the DB by ID
     *
     * @static
     * @param {*} Model - Model of Collections to query
     * @param {string} id - id resource to delete
     * @returns {null} nothing
     * @memberof DB
     */
    static async deleteById(Model, id) {
        try {
            await Model.deleteById(id);
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes multple resources in the DB
     *
     * @static
     * @param {*} Model - Model of Collections to query
     * @param {object} conditions - conditions to query the DB
     * @returns {null} nothing
     * @memberof DB
     */
    static async deleteAll(Model, conditions) {
        try {
            await Model.deleteMany(conditions);
            return;
        } catch (error) {
            throw error;
        }
    }
}

export default DB;
