import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getUser = async (req:any, res:Response) => {

    try {
        const { id } = req;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({
                msg:`There is no user with ID ${id}`
            });
        }
        res.json({
            msg: 'getUer',
            user
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'There was a mistake'
        });
    }
};   

export const login = async (req:Request, res:Response) =>{

    const { email, password } = req.body;
    try {
        // Verificar si el email existe
        const user:any = await User.findOne({
            where: { email }
        });

        if(!user){
            return res.status(400).json({
                msg:'User / Password are not correct - email'
            });
        }
        
        // Verificar el password
        const validarPassword = bcrypt.compareSync( password, user.password );
        if(!validarPassword){
            return res.status(400).json({
                msg:'User / Password are not correct - password'
            });
        }

        // Generar JWT
        const token: string = jwt.sign({ id: user.id }, process.env.SECRETOPRIVATEKEY || '');
        
        res.json({
            msg: 'login ok',
            user,
            token
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg:'There was a mistake'
        })
    }

}

