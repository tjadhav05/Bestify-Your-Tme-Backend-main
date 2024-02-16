const Options = require("./option.model")
module.exports = (sequelize, Sequelize) => {
    const QuestionBank = sequelize.define("questionbank", { //table name
        questid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,// Automatically gets converted to SERIAL for postgres
            allowNull: false,
            onDelete: 'cascade'
        },
        quizname: {
            type: Sequelize.STRING
        },
        question: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        ans: {
            type: Sequelize.STRING
        },
        marks: {
            type: Sequelize.INTEGER
        },
        timer: {
            type: Sequelize.TIME
        }
    });
    return QuestionBank;
}