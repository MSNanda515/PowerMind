const {pool} = require("../queries");

const table = "account";
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

    static async createNewAccount() {
        let createQuery = `
            INSERT INTO  account (balance)
            values (0)
            RETURNING id
        `;
        let resp = await this.execQuery(createQuery);
        return resp.rows[0].id;
    }

    static async getAccount(accountId) {
        let query = `
            Select * from ${table} where id=${accountId};
        `;
        let resp = await this.execQuery(query);
        let accountRec = resp.rows[0];
        return new Account(accountRec.balance);
    }
}

module.exports = {
    Account,
}