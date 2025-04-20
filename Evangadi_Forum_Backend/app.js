//app.js
require('dotenv').config();

const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');
app.use(cors());

const answerRoute = require('./routes/answerRoute');
const userRoute = require('./routes/userRoute');
const questionRoute = require('./routes/questionRoute');
const authMiddleware = require('./middleware/authMiddleware');

//json middleware extract
app.use(express.json());


//user route middleware
app.use('/api/user', userRoute);
app.use('/api/question',authMiddleware, questionRoute);
app.use('/api/answer',authMiddleware, answerRoute);
//dbConnection middleware
const db_Connection = require('./db/dbConfig');

async function start() {
    try {
 
        const result = await db_Connection.execute('select "test" ');
        await app.listen(port);
        console.log("listening on port " + port);
    } catch(err) {
        console.log(err.message);
    }
}
start();

