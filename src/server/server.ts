import express, { Request, Response } from "express";
const app = express();

//db info
import {pool} from "./db";

app.get("/shelf", async (req: Request, res: Response) =>{
    console.log(req);
    const userEmail = req.params;
    try{
        const shelf = await pool.query("SELECT * FROM shelf WHERE email = $1", [userEmail]);
        res.json(shelf.rows);
    }catch(err){
        console.error(err);
    }
});

const PORT = import.meta.env.PORT ?? 8000;

app.listen(PORT, () =>{
    console.log("server started successfully");
});

export const MyShelf = app;