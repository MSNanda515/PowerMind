const {User} = require("../model/User");
const UserController = {
    getAllUsers: async function(req, res) {
        try {
            await User.getAllUsers();
            return res.send("Done");
        } catch(err) {
            console.log("ERR")
            res.status(400).send(err.message);
        }
    },

    createUser: async function(req, res) {
        try {
            let reqBody = req.body;
            let threshold = reqBody?.threshold || 75;
            let capacity = reqBody?.capacity || 2.5;
            let dischargeCurrent = reqBody?.dischargeCurrent || 30;
            let dischargeVoltage = reqBody?.dischargeVoltage || 12;
            if (threshold < 0 || threshold > 100) {
                throw new Error("Invalid Threshold: " + threshold);
            }
            let userId = await User.createUser(threshold, capacity, dischargeCurrent, dischargeVoltage);
            return res.send(`${userId}`);
        } catch(err) {
            console.log("ERR")
            res.status(400).send(err.message);
        }
    },

    loginUser: async function(req, res) {
        try {
            let userId = req.body.userId;
            if (!userId) {
                throw new Error("Invalid userId: " + userId);
            }
            let userExists = await User.doesUserExist(userId);
            if (!userExists) {
                throw new Error("User does not exist");
            }
            return res.send(`${userId}`);
        } catch(err) {
            console.log("ERR")
            res.status(400).send(err.message);
        }
    }
}

module.exports = {
    UserController
}