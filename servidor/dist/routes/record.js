"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const recordsController_1 = require("../controllers/recordsController");
const validate_jwt_1 = __importDefault(require("../middlewares/validate-jwt"));
const validateFields_1 = __importDefault(require("../middlewares/validateFields"));
const router = express_1.Router();
router.get('/records', validate_jwt_1.default, recordsController_1.getRecords);
router.get('/lastTenRecords', validate_jwt_1.default, recordsController_1.getLastTenRecords);
router.get('/:id', validate_jwt_1.default, recordsController_1.getRecord);
router.post('/', validate_jwt_1.default, [
    express_validator_1.check('concept', 'The concept is required').not().isEmpty(),
    express_validator_1.check('amount', 'The amount is required').not().isEmpty(),
    express_validator_1.check('type', 'The type is required').not().isEmpty(),
], validateFields_1.default, recordsController_1.postRecord);
router.put('/:id', validate_jwt_1.default, recordsController_1.updateRecord);
router.delete('/:id', validate_jwt_1.default, recordsController_1.deleteRecord);
exports.default = router;
//# sourceMappingURL=record.js.map