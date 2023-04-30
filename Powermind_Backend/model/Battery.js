const {pool} = require("../queries");

const table = "battery";


class Battery {
    constructor(capacity, charge, dischargeCurrent, dischargeVoltage) {
        this.capacity = capacity;
        this.charge = charge;
        this.dischargeCurrent = dischargeCurrent;
        this.dischargeVoltage = dischargeVoltage;
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

    static async getBattery(batteryid){
        let query = `
            Select * from ${table} where id=${batteryid};
        `;
        let resp = await this.execQuery(query);
        let batteryRec = resp.rows[0];
        return new Battery(batteryRec.capacity, batteryRec.charge, batteryRec.dischargecurrent, batteryRec.dischargevoltage);
    }

    static getPercentage(charge, capacity) {
        return 100.0 * charge / capacity;
    }
}

module.exports = {
    Battery
}