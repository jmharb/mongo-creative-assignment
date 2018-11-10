const { MongoClient } = require('mongodb');
const dbUrl = 'mongodb://localhost:27017/';

class DBConnection {
    async init() {
        if (this.client && this.db) {
            return;
        }
        this.client = await this.establisConnection();
        this.db = this.client.db('Lab5');
    }
    establisConnection() {
        if (this.client) {
            return Promisie.resolve(this.client);
        }
        return new Promise((resolve, reject) => {
            // Use connect method to connect to the Server
            MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, client) {
                if (err) {
                    return reject(err);
                }
                return resolve(client);
            });
        });
    }
    createCollection(collection) {
        return new Promise((resolve, reject) => {
            this.db.createCollection(collection, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        })

    }
}

module.exports = new DBConnection();
