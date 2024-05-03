import express, { Request, Response } from "express";
import Cors from "cors";
const app = express();
app.use(Cors());

//db info
import {pool} from "./db";

app.get("/shelf/:userEmail", async (req: Request, res: Response) =>{
    //gets user email from request
    const {userEmail} = req.params;
    console.log(userEmail);
    try{
        const shelf = await pool.query("SELECT * FROM shelf WHERE email = $1", [userEmail]);
        res.json(shelf.rows);
    }catch(err){
        console.error(err);
    }
});

const PORT = 8000;

app.listen(PORT, () =>{
    console.log("server started successfully");
});

export const MyShelf = app;