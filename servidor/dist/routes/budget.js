"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const budgetsController_1 = require("../controllers/budgetsController");
const router = express_1.Router();
router.get('/:id', budgetsController_1.getBudget);
router.post('/', budgetsController_1.postBudget);
router.put('/:id', budgetsController_1.updateBudget);
router.delete('/:id', budgetsController_1.deleteBudget);
exports.default = router;
//# sourceMappingURL=budget.js.map