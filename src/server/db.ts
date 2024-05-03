import pg from "pg";
import dotenv from 'dotenv';
dotenv.config({ path: './db.env' });

export const pool = new pg.Pool({
    user: process.env.POSTGRES_USERNAME as string,
    password: process.env.POSTGRES_PASSWORD as string,
    host: process.env.HOST,
    port: process.env.PORT as unknown as number,
    database: "myshelf"
});

//module.exports = pool;