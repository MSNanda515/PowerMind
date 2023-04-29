const {pool} = require("../queries");

class Account {
    constructor(balance) {
        this.balance = balance;
    }

    static async select(columns, clause) {
        let query = `SELECT ${columns} FROM "account"`;
        if (clause) query += clause;
        return pool.query(query);
    }

    static async execQuery(query) {
        return pool.query(query);
    }

    static async getBalance(accountId) {
        let columns = "*"
        let clause = ` where id=${accountId}`;
        let resp = await this.select(columns);
        if (resp.length == 0) {
            return {};
        }
        return resp.rows[0];
    }
}

module.exports = {
    User,
}