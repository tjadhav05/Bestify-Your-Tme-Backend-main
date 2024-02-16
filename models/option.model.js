const Question = require("./qustion.model")
module.exports = (sequelize, Sequelize) => {

    const Option = sequelize.define("option", { //table name

        optid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,// Automatically gets converted to SERIAL for postgres
            allowNull: false,

        },
        optionA: {
            type: Sequelize.STRING
        },
        optionB: {
            type: Sequelize.STRING
        },
        optionC: {
            type: Sequelize.STRING
        },
        optionD: {
            type: Sequelize.STRING
        }
    });
    return Option;
}