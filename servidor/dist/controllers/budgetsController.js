"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBudget = exports.updateBudget = exports.postBudget = exports.getBudget = void 0;
const getBudget = (req, res) => {
    res.json({
        msg: 'getBudget',
    });
};
exports.getBudget = getBudget;
const postBudget = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'postBudget',
        body
    });
};
exports.postBudget = postBudget;
const updateBudget = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: 'updateBudget',
        id
    });
};
exports.updateBudget = updateBudget;
const deleteBudget = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'deleteBudget',
        id
    });
};
exports.deleteBudget = deleteBudget;
//# sourceMappingURL=budgetsController.js.map