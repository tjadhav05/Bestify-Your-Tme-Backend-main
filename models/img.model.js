
module.exports = (sequelize, Sequelize) => {
    const imageUrl = sequelize.define("imgurl", { //table name
        imgId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,// Automatically gets converted to SERIAL for postgres
            allowNull: false,
        },
        imgurl: {
            type: Sequelize.STRING
        },
        quizname: {
            type: Sequelize.STRING
        }
    });

    return imageUrl;
}