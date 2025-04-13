const express = require('express');
const app = express();
const port = 5000;
const userRoute = require('./routes/userRoute');

//json middleware extract
app.use(express.json());


//user route middleware
app.use('/api/user', userRoute);

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

