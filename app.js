const express = require("express");
require("./db");
const Task = require("./Routers/quiz");
// const User = require("./Routers/user");

const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());

app.use(Task)



app.listen(port, () => {
    console.log(`connection is setup at localhost:${port}`)
})