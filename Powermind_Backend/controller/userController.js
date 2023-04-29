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
    }
}

module.exports = {
    UserController
}