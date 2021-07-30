import { Router } from "express";
import { check } from "express-validator";
import { postUser } from "../controllers/usersController";
import validateFields from "../middlewares/validateFields";

const router = Router();



router.post('/',[
    check('email', 'The email is not valid').isEmail()
    ], 
    validateFields,   
    postUser );


export default router;