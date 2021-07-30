import  Sequelize from "sequelize";
import db from "../db/connection";

const User = db.define('User', {
    
    id: {
        type:  Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
        unique: true
    },

    name: {
        type:  Sequelize.STRING,
        allowNull: false
    },
    email: {
        type:  Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type:  Sequelize.STRING,
        allowNull: false
    }
});

export default User;

