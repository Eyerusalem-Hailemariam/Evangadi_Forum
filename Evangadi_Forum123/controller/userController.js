const db_Connection = require('../db/dbConfig');
const bcrypt = require('bcrypt');
const StatusCodes = require('http-status-codes').StatusCodes;

async function  register(req, res) {
    const {username, firstname, lastname, email, password } =req.body;
    
    if (!username || !firstname || !lastname || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields are required' });
    }
    try {
        const [user] = await db_Connection.query('select username, userid from users where username = ? or email = ?', [username, email]);
        if (user.length > 0) {
            return res.status(409).json({ message: 'User already exists' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        //encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);
        await db_Connection.query("INSERT INTO users(username, firstname,lastname, email, password) VALUES(?,?,?,?,?)",[username, firstname,lastname, email, hashedPassword]);
        return res.status(StatusCodes.CREATED).json({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
}
async function  login(req, res) {
    res.send('register user');
}
async function  checkUser(req, res) {
    res.send('register user');
}
module.exports = { register, login, checkUser }; // export the functions