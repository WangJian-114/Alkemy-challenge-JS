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
exports.postUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const emailExists = yield user_1.default.findOne({
            where: { email: body.email }
        });
        if (emailExists) {
            return res.status(400).json({
                msg: 'There is already a user with the email ' + body.email
            });
        }
        // Encriptar password
        const salt = bcryptjs_1.default.genSaltSync();
        body.password = bcryptjs_1.default.hashSync(body.password, salt);
        const user = user_1.default.build(body);
        yield user.save();
        res.json({
            msg: 'postUser',
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'There was a mistake'
        });
    }
});
exports.postUser = postUser;
//# sourceMappingURL=usersController.js.map