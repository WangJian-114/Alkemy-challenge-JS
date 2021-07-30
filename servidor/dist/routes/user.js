"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usersController_1 = require("../controllers/usersController");
const validateFields_1 = __importDefault(require("../middlewares/validateFields"));
const router = express_1.Router();
router.post('/', [
    express_validator_1.check('email', 'The email is not valid').isEmail()
], validateFields_1.default, usersController_1.postUser);
exports.default = router;
//# sourceMappingURL=user.js.map