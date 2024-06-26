import pg from "pg";
import dotenv from 'dotenv';
dotenv.config({ path: './db.env' });


export const pool = new pg.Pool({
    user: process.env.POSTGRES_USERNAME as string,
    password: process.env.POSTGRES_PASSWORD as string,
    host: process.env.HOST,
    port: process.env.PORT as unknown as number,
    database: "myshelf",

    //had to add this for AWS database
    ssl: {
        rejectUnauthorized: false
    }
});

//added purely for testing purposes
pool.connect((err) => {
    if(err){
        console.log(err.message);
        return;
    }
    console.log("Database connected");
})

//module.exports = pool;