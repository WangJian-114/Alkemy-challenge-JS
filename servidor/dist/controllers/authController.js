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
exports.login = exports.getUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({
                msg: `There is no user with ID ${id}`
            });
        }
        res.json({
            msg: 'getUer',
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
exports.getUser = getUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verificar si el email existe
        const user = yield user_1.default.findOne({
            where: { email }
        });
        if (!user) {
            return res.status(400).json({
                msg: 'User / Password are not correct - email'
            });
        }
        // Verificar el password
        const validarPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'User / Password are not correct - password'
            });
        }
        // Generar JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRETOPRIVATEKEY || '');
        res.json({
            msg: 'login ok',
            user,
            token
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'There was a mistake'
        });
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map