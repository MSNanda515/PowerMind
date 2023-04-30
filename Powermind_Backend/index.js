const express = require('express')
const {UserController} = require("./controller/userController");
const app = express()
const cors = require('cors')
app.use(express.json());
app.use(cors())

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/users/all', UserController.getAllUsers);
app.post('/users/create', UserController.createUser);
app.post('/users/login', UserController.loginUser);
