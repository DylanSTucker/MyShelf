import pg from "pg";
import dotenv from 'dotenv';
dotenv.config({ path: 'db.env' });

export const pool = new pg.Pool({
    user: process.env.REACT_APP_POSTGRES_USERNAME as string,
    password: process.env.REACT_APP_POSTGRES_PASSWORD as string,
    host: process.env.REACT_APP_HOST,
    port: process.env.REACT_APP_DB_PORT as unknown as number,
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