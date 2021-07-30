import { Request, Response } from 'express';
import Record from '../models/record';

export const getLastTenRecords = async (req:any, res:Response) => {

    const { id } = req;
    const records = await Record.findAll({
        where: { UserId: id }, limit:10, 
        order: [['createdAt', 'DESC']],
    });

    if( !records ) {
        return res.status(404).json({
            msg: `Records do not exist`
        });
    }
    res.status(200).json({
        msg: 'getLastTenRecords',
        records
    });
};  


export const getRecords = async (req:any, res:Response) => {

    const { id } = req;
    const records = await Record.findAll({
        where: { UserId: id },
        order: [['createdAt', 'DESC']],
    });

    if( !records ) {
        return res.status(404).json({
            msg: `Records do not exist`
        });
    }
    res.status(200).json({
        msg: 'getRecords',
        records
    });
};  


export const getRecord = async (req:Request, res:Response) => {

    const { id } = req.params;
    const record = await Record.findByPk( id );
    if( !record ) {
        return res.status(404).json({
            msg: `The record does not exist`
        });
    }
    res.status(200).json({
        msg: 'getRecord',
        record
    });
};  

export const getRecordsIncome = async (req:Request, res:Response) => {

    const records = await Record.findAll({
        where: { type: 'income' }
    });

    if( !records ) {
        return res.status(404).json({
            msg: `Records do not exist`
        });
    }
    res.status(200).json({
        msg: 'getRecord',
        records
    });
};  

export const getRecordsExpenses = async (req:Request, res:Response) => {
    const records = await Record.findAll({
        where: { type: 'expenses' }
    });

    if( !records ) {
        return res.status(404).json({
            msg: `Records do not exist`
        });
    }
    res.status(200).json({
        msg: 'getRecord',
        records
    });
};  


export const postRecord = async (req:any, res:Response) => {

    const { body, id } = req;
    body.UserId = id;

    try {
        const record = Record.build(body);
        await record.save();
        res.status(200).json({
            msg: 'postRecord',
            record
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'There was a mistake'
        });
    }


};  


export const updateRecord = async (req:Request, res:Response) => {

    const { id } = req.params;
    const { body } = req;
    try {
        const record = await Record.findByPk(id);
        if ( !record ) {
            return res.status(404).json({
                msg: 'The record does not exist'
            });
        }

        await record.update(body);

        res.status(200).json({
            msg: 'updateRecord',
            record
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'There was a mistake'
        });
    }
};   


export const deleteRecord = async (req:Request, res:Response) => {

    const { id } = req.params;

    try {
        const record = await Record.findByPk(id);
        if ( !record ) {
            return res.status(404).json({
                msg: 'The record does not exist'
            });
        }
    
        // Eliminacion logica
        // await usuario.update({ estado: false });
    
        await record.destroy();
        res.status(200).json({
            msg: 'deleteRecord',
            id
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'There was a mistake'
        });
    }
};   
