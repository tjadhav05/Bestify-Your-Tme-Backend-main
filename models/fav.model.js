module.exports = (sequelize, Sequelize) => {
    const Fav = sequelize.define("favourite", { //table name
        favid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,// Automatically gets converted to SERIAL for postgres
            allowNull: false,
        },
        quizname: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        }
    });

    return Fav;
}