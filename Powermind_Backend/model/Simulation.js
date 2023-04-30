
const table = "sim";

const Simulation = {
    getDemand: function(x) {
        return -1.0/2 * x * (x-24);
    },

    getSupply: function(x) {
        return 20-15.33918*x + 5.77129*(x**2) - 0.4246004*(x**3) + 0.00878167 * (x**4);
    }
}

module.exports = {
    Simulation
}