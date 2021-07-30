import { Response, NextFunction } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';

export interface Payload {
    id: string;
    iat: number;
} 

const validateJWT = async (req:any, res:Response, next:NextFunction) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRETOPRIVATEKEY || '') as Payload;

        const { id } = payload;

        // Leer el usuario que corresponde al uid

        const userAuthenticated = await User.findByPk(id);
        
        if(!userAuthenticated){
            return res.status(401).json({
                msg:'Invalid token, -uid does not exist'
            })
        }

        req.userAuthenticated = userAuthenticated;
        req.id = id
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        })
    }

}

export default validateJWT;