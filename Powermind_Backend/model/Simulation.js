const {pool} = require("../queries");

const table = "sim";
const simKey = "buf";

const simData = {
    supply: [],
    demand: [],
}

const Simulation = {
    getDemand: function(x) {
        return -1.0/2 * x * (x-24);
    },

    getSupply: function(x) {
        return 20-15.33918*x + 5.77129*(x**2) - 0.4246004*(x**3) + 0.00878167 * (x**4);
    },

    getSimResult: async function(time) {
        if (time == 0) {
            await this.resetSim();
        }
        let sim = await this.getStoredSimData();
        sim.supply.push(this.getSupply(time));
        sim.demand.push(this.getDemand(time));
        await this.storeSimData(sim);
        return sim;
    },

    resetSim: async function() {
        simData.supply = [];
        simData.demand = [];
        await this.storeSimData(simData);
    },

    storeSimData: async function(data) {
        let query = `
            update ${table} set val='${JSON.stringify(data)}' where key='${simKey}'
        `;
        await this.execQuery(query);
    },

    getStoredSimData: async function() {
        let query = `
            select val from ${table}
            where key='${simKey}' 
        `;
        let resp = await this.execQuery(query);
        return resp.rows[0].val;
    },

    execQuery: async function(query) {
        return pool.query(query);
    }
}

module.exports = {
    Simulation
}