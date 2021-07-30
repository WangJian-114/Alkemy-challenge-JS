"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authController_1 = require("../controllers/authController");
const validateFields_1 = __importDefault(require("../middlewares/validateFields"));
const validate_jwt_1 = __importDefault(require("../middlewares/validate-jwt"));
const router = express_1.Router();
router.get('/user', validate_jwt_1.default, authController_1.getUser);
router.post('/login', [
    express_validator_1.check('email', 'The email is not valid').isEmail()
], validateFields_1.default, authController_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map