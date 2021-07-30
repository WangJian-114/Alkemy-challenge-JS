import { Sequelize } from 'sequelize';

const db = new Sequelize('challenge', 'root', 'root', {
    host: 'localhost', 
    port:3308,
    dialect:'mysql',

    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle:10000
    }
});

export default db;