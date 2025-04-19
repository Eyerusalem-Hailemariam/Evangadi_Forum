const db_Connection = require('../db/dbConfig');
const bcrypt = require('bcrypt');
const StatusCodes = require('http-status-codes').StatusCodes;
const jwt = require('jsonwebtoken');

async function addQuestion(req, res) {
    const {userid, username, title, description, tags} = req.body;
    if (!userid || !username || !title || !description || !tags) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "All fields are required" });
    }
    try {
        const [question] = await db_Connection.query("INSERT INTO question (userid, username, title, description, tags) VALUES (?, ?, ?, ?, ?)", [userid, username, title, description, tags]);
        return res.status(StatusCodes.CREATED).json({ message: "Question added successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
}

async function getAllQuestion(req, res) {
    try {
        const [questions] = await db_Connection.query("SELECT * FROM question");
        if (questions.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "No questions found" });
        }

        return res.status(StatusCodes.OK).json(questions);
    } catch(err) {
        console.log(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
}
module.exports = {addQuestion, getAllQuestion};