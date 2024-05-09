import express, { Request, Response } from "express";
import Cors from "cors";
import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

//endpoint for signup
app.post('/signup', async(req, res) => {
    const {user_name, email, password} = req.body;

    //maybe read documentation on this
    const salt = Bcrypt.genSaltSync(10);
    const hashe_password = Bcrypt.hashSync(password, salt);
    try{
        const signup = await pool.query(`INSERT INTO users(user_name, email, hashed_password) VALUES($1, $2, $3)`, 
        [user_name, email, hashe_password]);
        const token = jwt.sign({email}, "secret", {expiresIn: "1hr"});
        res.json({email, token});
    }catch(err){
        console.log(err);
        
        if(err){
            res.json({detail: err});
        }
        
    }
})

//endpoint for login

app.post('/login', async(req, res) => {
    const {user_name, email, password} = req.body;
    try{
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(users && !users.rows.length) {
            return res.json({detail: "User does not exist!"});
        }
        const success = await Bcrypt.compare(password, users.rows[0].hashed_password);
        const token = jwt.sign({email}, "secret", {expiresIn: "1hr"});
        if(success){
            res.json({"email": users.rows[0].email, token});
        }else{
            res.json({detail: "Login failed"});
        }
    }catch(err){
        console.log(err);
    }
})


const PORT = 8000;

app.listen(PORT, () =>{
    console.log("server started successfully");
});

export const MyShelf = app;