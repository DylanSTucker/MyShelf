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
    try{
        const shelf = await pool.query("SELECT * FROM shelf WHERE email = $1", [userEmail]);
        res.json(shelf.rows);
    }catch(err){
        console.error(err);
    }
});

//get users notes from a specific book
app.get("/notes/:userEmail/:volume_id", async (req: Request, res: Response) =>{
    //gets user email from request
    const {userEmail, volume_id} = req.params;
    try{
        const notes = await pool.query("SELECT * FROM notes WHERE email = $1 AND volume_id = $2", [userEmail, volume_id]);
        res.json(notes.rows);
    }catch(err){
        console.error(err);
    }
});

//add a book to the users book shelf
app.post('/shelf/:userEmail', async (req: Request, res: Response) =>{
    const {userEmail} = req.params;    
    const {title, email, author, publisher, publisher_date, thumbnail, categories, volume_id} = req.body;
    console.log(title, userEmail, author, publisher, publisher_date, thumbnail, categories, volume_id);
    const id = uuidv4();
    
    try{
        const newShelfEntry = pool.query(`INSERT INTO shelf(id, title, author, publisher, email, publisher_date, thumbnail, categories, volume_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [id, title, author, publisher, userEmail, publisher_date, thumbnail, categories, volume_id]);
    res.json(newShelfEntry);
    }catch(err){
        console.error(err);
    }
})

//remove a book from shelf
app.post('/shelf/:userEmail/remove', async (req: Request, res: Response) =>{
    const {title} = req.body;
    try{
        const newShelfEntry = pool.query(`DELETE FROM shelf WHERE title=$1`,
    [title]);
    res.json(newShelfEntry);
    }catch(err){
        console.error(err);
    }
})

//add a note to a book
app.post('/shelf/:userEmail/notes', async (req: Request, res: Response) =>{
    const {userEmail} = req.params;    
    const {title, volume_id, note} = req.body;
    console.log(title, volume_id, note);
    const id = uuidv4();
    
    try{
        const newShelfEntry = pool.query(`INSERT INTO notes(id, title, note, volume_id, email) VALUES($1, $2, $3, $4, $5)`,
    [id, title, note, volume_id, userEmail]);
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