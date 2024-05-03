import pg from "pg";
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export const pool = new pg.Pool({
    user: import.meta.env.VITE_POSTGRES_USERNAME as string,
    password: import.meta.env.VITE_POSTGRES_PASSWORD as string,
    host: import.meta.env.VITE_HOST,
    port: import.meta.env.VITE_DB_PORT as unknown as number,
    database: "myshelf"
});

//module.exports = pool;