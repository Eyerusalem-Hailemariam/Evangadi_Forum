const db_Connection = require('../db/dbConfig');
const StatusCodes = require('http-status-codes').StatusCodes;

async function addAnswer(req, res) {
    const {questionid, userid, answer} = req.body;
    console.log(req.body)
    if (!questionid || !userid || !answer) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "All fields are required" });
    }
    try {
        const [result] = await db_Connection.query("INSERT INTO answer (questionid, userid, answer) VALUES (?, ?, ?)", [questionid, userid, answer]);
        return res.status(StatusCodes.CREATED).json({ message: "Answer added successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
}

async function getAllAnswerbyQuestionId(req, res) {
    const { questionid } = req.params;
    try {
        const [answers] = await db_Connection.query("SELECT * FROM answer WHERE questionid = ?", [questionid]);
        if (answers.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "No answers found" });
        }
        return res.status(StatusCodes.OK).json(answers);
    } catch (err) {
        console.log(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
}
module.exports = {addAnswer, getAllAnswerbyQuestionId};