
module.exports = (sequelize, Sequelize) => {
    const Score = sequelize.define("scorelog", { //table name
        scoreId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,// Automatically gets converted to SERIAL for postgres
            allowNull: false,

        },
        score: {
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.STRING
        },
        quizname: {
            type: Sequelize.STRING
        }
    });

    return Score;
}