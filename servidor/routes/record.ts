import { Router } from "express";
import { check } from "express-validator";
import { deleteRecord, getLastTenRecords, getRecord, getRecords,  postRecord, updateRecord } from "../controllers/recordsController";
import validateJWT from "../middlewares/validate-jwt";
import validateFields from "../middlewares/validateFields";


const router = Router();

router.get('/records',  
    validateJWT,
    getRecords 
);

router.get('/lastTenRecords',  
    validateJWT,
    getLastTenRecords
);

router.get('/:id',  
    validateJWT,
    getRecord 
);

router.post('/',  
    validateJWT,
    [
        check('concept','The concept is required').not().isEmpty(),
        check('amount','The amount is required').not().isEmpty(),
        check('type','The type is required').not().isEmpty(),
    ],  
    validateFields,
    postRecord 
);

router.put('/:id', 
    validateJWT,       
    updateRecord );

router.delete('/:id',   
    validateJWT,  
    deleteRecord );


export default router;