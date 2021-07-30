import { Router } from "express";
import { check } from "express-validator";
import { getUser, login } from "../controllers/authController";
import validateFields from "../middlewares/validateFields";
import validateJWT from "../middlewares/validate-jwt";


const router = Router();

router.get('/user', 
    validateJWT,
    getUser );

router.post('/login',[
    check('email', 'The email is not valid').isEmail()
    ], 
    validateFields,   
    login);


export default router;