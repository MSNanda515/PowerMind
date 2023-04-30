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

    static async createNewBattery(capacity, dischargeCurrent, dischargeVoltage) {
        let createQuery = `
            INSERT INTO  ${table} (capacity, charge, dischargeCurrent, dischargeVoltage)
            values (${capacity}, ${capacity}, ${dischargeCurrent}, ${dischargeVoltage})
            RETURNING id
        `;
        let resp = await this.execQuery(createQuery);
        return resp.rows[0].id;
    }
}

module.exports = {
    Battery
}