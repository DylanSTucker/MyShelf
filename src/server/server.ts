import express, { Request, Response } from "express";
import Cors from "cors";
import {v4 as uuidv4} from 'uuid';
const app = express();

app.use(Cors());
app.use(express.json());

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

//add a book to the users book shelf
app.post('/shelf', async (req, res) =>{
    const {book_title, email, book_author, book_publisher, date, thumbnail} = req.body;
    console.log(book_title, email, book_author, book_publisher, date, thumbnail);
    const id = uuidv4();
    try{
        const newShelfEntry = pool.query(`INSERT INTO shelf(id, book_title, book_author, book_publisher, email, date, thumbnail) VALUES($1, $2, $3, $4, $5, $6, $7)`,
    [id, book_title, book_author, book_publisher, email, date, thumbnail]);
    res.json(newShelfEntry);
    }catch(err){
        console.error(err);
    }
})

const PORT = 8000;

app.listen(PORT, () =>{
    console.log("server started successfully");
});

export const MyShelf = app;