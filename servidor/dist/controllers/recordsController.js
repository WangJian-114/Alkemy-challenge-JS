"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecord = exports.updateRecord = exports.postRecord = exports.getRecordsExpenses = exports.getRecordsIncome = exports.getRecord = exports.getRecords = exports.getLastTenRecords = void 0;
const record_1 = __importDefault(require("../models/record"));
const getLastTenRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req;
    const records = yield record_1.default.findAll({
        where: { UserId: id }, limit: 10,
        order: [['createdAt', 'DESC']],
    });
    if (!records) {
        return res.status(404).json({
            msg: `Records do not exist`
        });
    }
    res.status(200).json({
        msg: 'getLastTenRecords',
        records
    });
});
exports.getLastTenRecords = getLastTenRecords;
const getRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req;
    const records = yield record_1.default.findAll({
        where: { UserId: id },
        order: [['createdAt', 'DESC']],
    });
    if (!records) {
        return res.status(404).json({
            msg: `Records do not exist`
        });
    }
    res.status(200).json({
        msg: 'getRecords',
        records
    });
});
exports.getRecords = getRecords;
const getRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const record = yield record_1.default.findByPk(id);
    if (!record) {
        return res.status(404).json({
            msg: `The record does not exist`
        });
    }
    res.status(200).json({
        msg: 'getRecord',
        record
    });
});
exports.getRecord = getRecord;
const getRecordsIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const records = yield record_1.default.findAll({
        where: { type: 'income' }
    });
    if (!records) {
        return res.status(404).json({
            msg: `Records do not exist`
        });
    }
    res.status(200).json({
        msg: 'getRecord',
        records
    });
});
exports.getRecordsIncome = getRecordsIncome;
const getRecordsExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const records = yield record_1.default.findAll({
        where: { type: 'expenses' }
    });
    if (!records) {
        return res.status(404).json({
            msg: `Records do not exist`
        });
    }
    res.status(200).json({
        msg: 'getRecord',
        records
    });
});
exports.getRecordsExpenses = getRecordsExpenses;
const postRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, id } = req;
    body.UserId = id;
    try {
        const record = record_1.default.build(body);
        yield record.save();
        res.status(200).json({
            msg: 'postRecord',
            record
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'There was a mistake'
        });
    }
});
exports.postRecord = postRecord;
const updateRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const record = yield record_1.default.findByPk(id);
        if (!record) {
            return res.status(404).json({
                msg: 'The record does not exist'
            });
        }
        yield record.update(body);
        res.status(200).json({
            msg: 'updateRecord',
            record
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'There was a mistake'
        });
    }
});
exports.updateRecord = updateRecord;
const deleteRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const record = yield record_1.default.findByPk(id);
        if (!record) {
            return res.status(404).json({
                msg: 'The record does not exist'
            });
        }
        // Eliminacion logica
        // await usuario.update({ estado: false });
        yield record.destroy();
        res.status(200).json({
            msg: 'deleteRecord',
            id
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'There was a mistake'
        });
    }
});
exports.deleteRecord = deleteRecord;
//# sourceMappingURL=recordsController.js.map