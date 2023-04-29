const {pool} = require("../queries");

const table = "battery";


class Battery {


    constructor(capacity, charge) {
        this.capacity = capacity;
        this.charge = charge;
    }

    static async select(columns, clause) {
        let query = `SELECT ${columns} FROM ${table}`;
        if (clause) query += clause;
        return pool.query(query);
    }

    static async execQuery(query) {
        return pool.query(query);
    }

    // static async getBalance(accountId) {
    //     let columns = "*"
    //     let clause = ` where id=${accountId}`;
    //     let resp = await this.select(columns);
    //     if (resp.length == 0) {
    //         return {};
    //     }
    //     return resp.rows[0];
    // }

    static async createNewBattery(capacity) {
        let createQuery = `
            INSERT INTO  ${table} (capacity, charge)
            values (${capacity}, ${capacity})
            RETURNING id
        `;
        let resp = await this.execQuery(createQuery);
        return resp.rows[0].id;
    }
}

module.exports = {
    Battery
}