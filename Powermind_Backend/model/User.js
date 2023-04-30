const {pool} = require("../queries");
const {Account} = require("./Account");
const {Battery} = require("./Battery");

const table = "users";
class User {
    constructor(capacity, threshold) {
        this.capacity = capacity;
        this.threshold = threshold;
    }

    static async select(columns, clause) {
        let query = `SELECT ${columns} FROM ${table}`;
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

    static async createUser(threshold, capacity, dischargeCurrent, dischargeVoltage) {
        let accountId = await Account.createNewAccount();
        let batteryId = await Battery.createNewBattery(capacity, dischargeCurrent, dischargeVoltage);
        let sell = threshold < 100;
        let createQuery = `
            INSERT INTO  ${table} (account_id, battery_id, threshold, outflow, sell)
            values (${accountId}, ${batteryId}, ${threshold}, ${0},${sell})
            RETURNING id
        `;
        let resp = await this.execQuery(createQuery);
        return resp.rows[0].id;
    }

    /**
     * Determines if the user with given userId exists
     */
    static async doesUserExist(userId) {
        let findQuery = `
            select id from ${table} where id=${userId}
        `;
        let resp = await this.execQuery(findQuery);
        return resp.rows.length > 0;
    }

    // static async create
}

module.exports = {
    User,
}