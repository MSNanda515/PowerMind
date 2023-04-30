const express = require('express')
const {UserController} = require("./controller/userController");
const app = express()
app.use(express.json());
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/users/all', UserController.getAllUsers);
app.post('/users/create', UserController.createUser);
