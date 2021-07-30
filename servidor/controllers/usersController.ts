import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';


export const postUser = async (req:Request, res:Response) => {

    const { body } = req;

    try {
        const emailExists = await User.findOne({
            where: { email: body.email }
        });

        if ( emailExists ) {
            return res.status(400).json({
                msg: 'There is already a user with the email '+ body.email
            });
        }

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        body.password = bcrypt.hashSync( body.password, salt );

        const user = User.build(body);
        await user.save();
        res.json({
            msg: 'postUser',
            user
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'There was a mistake'
        });
    }
}; 


