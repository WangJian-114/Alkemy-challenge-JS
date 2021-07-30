import Sequelize from "sequelize";
import User from "./user";
import db from "../db/connection";

const Record = db.define('Record', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
        unique: true
    },
    concept: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM('income', 'expenses'),
        allowNull: false
    },

    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

Record.belongsTo(User);

export default Record;
