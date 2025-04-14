const db_Connection = require('../db/dbConfig');
const bcrypt = require('bcrypt');
const StatusCodes = require('http-status-codes').StatusCodes;
const jwt = require('jsonwebtoken');

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
        console.log(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
}
async function  login(req, res) {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields are required' });
    }

    try {

        const [user] = await db_Connection.query('select * from users where email = ?', [email]);
        if (user.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user[0].password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const username = user[0].username;
        const userid = user[0].userid;
        const token = jwt.sign({ username, userid}, process.env.JWT_SECRET, {expiresIn : '1h'})


        return res.status(StatusCodes.OK).json({msg: "user login succesfully", token})

        return res.json({ user : user[0].password});
    } catch(err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }

}
async function  checkUser(req, res) {
    const username = req.user.username
    const userid = req.user.userid

    res.status(StatusCodes.OK).json({ msg: "user is authenticated", username, userid })
}
module.exports = { register, login, checkUser };