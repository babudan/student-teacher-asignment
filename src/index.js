const express = require('express');
const app = express();
const { dbconnection } = require("../src/config/config.js");
const route = require('./routes/route.js');

const port = 3000;
app.use(express.json());

dbconnection.sync({ alter: true })
    .then(() => {
        console.log('Database connected successfully!')
    })
    .catch((err) => {
        console.log(err)
    })

app.use('/', route);

app.listen(port, function () {
    console.log('Express app running on port  ' + port)
});