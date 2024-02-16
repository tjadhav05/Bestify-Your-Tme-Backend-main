module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", { //table name
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,// Automatically gets converted to SERIAL for postgres
            allowNull: false,

        },
        username: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN
        }
    }
    );
    return User;
};