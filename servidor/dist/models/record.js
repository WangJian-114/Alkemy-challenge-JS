"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const user_1 = __importDefault(require("./user"));
const connection_1 = __importDefault(require("../db/connection"));
const Record = connection_1.default.define('Record', {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    concept: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    amount: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    type: {
        type: sequelize_1.default.ENUM('income', 'expenses'),
        allowNull: false
    },
    date: {
        type: sequelize_1.default.DATE,
        allowNull: false
    }
});
Record.belongsTo(user_1.default);
exports.default = Record;
//# sourceMappingURL=record.js.map