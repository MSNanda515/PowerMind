const {User} = require("../model/User");
const DashController = {
    getDashData: async function(req, res) {
        try {
            let userId = req.query?.userId || 1;
            let user = await User.getUser(userId);
            res.send({user: user});
        } catch(err) {
            console.log("ERR")
            res.status(400).send(err.message);
        }
    },

    saveThreshold: async function(req, res) {
        try {
            let userId = req.query?.userId || 1;
            let threshold = req.query?.threshold || 75;
            let user = await User.updateThreshold(userId, +threshold);
            res.send({user});
        } catch(err) {
            console.log("ERR")
            res.status(400).send(err.message);
        }
    }
};

module.exports = {
    DashController
}