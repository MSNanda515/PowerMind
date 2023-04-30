const {pool} = require("../queries");
const {Account} = require("./Account");
const {Battery} = require("./Battery");

const table = "users";
class User {
    constructor(id, threshold, battery, account, sell) {
        this.battery = battery;
        this.threshold = threshold;
        this.account = account;
        this.sell = sell;
        this.id = id;
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
    static async getUser(userId) {
        let query = `
            Select * from ${table} where id=${userId};
        `;
        let resp = await this.execQuery(query);
        if (resp.rows.length == 0) {
            throw new Error(`User ${userId} does not exist`);
        }
        let userRec = resp.rows[0];
        let account = await Account.getAccount(userRec.account_id);
        let battery = await Battery.getBattery(userRec.battery_id);
        return new User(userId, userRec.threshold, battery, account, userRec.sell);
    }

    static async updateThreshold(userId, threshold) {
        this.verifyThreshold(threshold);
        let user = await this.getUser(userId);
        if (threshold < user.threshold) {
            await this.updateDataDb([["threshold", threshold]], userId);
            user.threshold = threshold;
            return user;
        }
        if (Battery.getPercentage(user.battery.charge, user.battery.capacity) >= threshold) {
            await this.updateDataDb([["threshold", threshold], ["sell", true]], userId);
            user.threshold = threshold;
            user.sell = true;
        } else {
            await this.updateDataDb([["threshold", threshold], ["sell", false]], userId);
            user.threshold = threshold;
            user.sell = false;
        }
        return user;
    }

    static async updateDataDb(values, userId) {
        let valuesList = values.map((val) => val.join('='));
        let updateColStr = valuesList.join();
        let updateQuery = `
            UPDATE ${table} SET ${updateColStr} where id=${userId}
        `
        await this.execQuery(updateQuery);
    }

    static verifyThreshold(threshold) {
        if (threshold < 0 || threshold > 100) {
            throw new Error("Invalid Threshold: " + threshold);
        }
    }
}

module.exports = {
    User,
}