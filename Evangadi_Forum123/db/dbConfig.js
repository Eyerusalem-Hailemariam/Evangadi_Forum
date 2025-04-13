const mysql2 = require('mysql2');
require('dotenv').config();

const db_Connection = mysql2.createPool({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    host: "localhost",
    password: process.env.DB_PASSWORD,
    connectionLimit:10
});

console.log(process.env.JWT_SECRET)
// db_Connection.execute('select "test" ', (err, result) => {
//     if (err) {
//         console.log(err.message);
//     } else {
//         console.log(result);
//     }
// });

module.exports= db_Connection.promise();