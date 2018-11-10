const DBConnection = require('./db-connection');

class CommenetDAO {
    async init() {
        if (this.collection) {
            return;
        }
        try {
            await DBConnection.init();
            this.collection = await DBConnection.createCollection('comments');
        } catch (e) {
            console.log(e);
        }
    }
    async find(query = {}) {
        await this.init();
        return new Promise((resolve, reject) => {
            this.collection.find(query).toArray((err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results)
            })
        });
    }
    async remove(query = {}) {
        await this.init();
        return new Promise((resolve, reject) => {
            this.collection.deleteMany(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results)
            })
        });
    }
    async insertOne(data) {
        await this.init()
        return new Promise((resolve, reject) => {
            this.collection.insertOne(data, function (err, result) {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }
}

module.exports = new CommenetDAO();