const {pool} = require("../queries");

class User {
    constructor(capacity, threshold) {
        this.capacity = capacity;
        this.threshold = threshold;
    }

    static async select(columns, clause) {
        let query = `SELECT ${columns} FROM "users"`;
        if (clause) query += clause;
        return pool.query(query);
    }

    static async execQuery(query) {
        return pool.query(query);
    }

    static async getAllUsers() {
        let columns = "*"
        let resp = await this.select(columns);
        console.log(resp.rows);
    }

    // static async create
}

module.exports = {
    User,
}