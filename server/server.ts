import express, { Request, Response } from "express";
import Cors from "cors";
import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {v4 as uuidv4} from 'uuid';
const app = express();

app.use(Cors());
app.use(express.json());
app.use(express.static('dist-react'));

//db info
import {pool} from "./db";

app.get("/api/shelf/:userEmail", async (req: Request, res: Response) =>{
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
app.get("/api/notes/:userEmail/:volume_id", async (req: Request, res: Response) =>{
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
app.post('/api/shelf/:userEmail', async (req: Request, res: Response) =>{
    const {userEmail} = req.params;    
    const date_read = new Date().toDateString();
    console.log(date_read);
    const {title, author, publisher, publisher_date, thumbnail, categories, volume_id, page_count} = req.body;
    console.log(title, userEmail, author, publisher, publisher_date, thumbnail, categories, volume_id, date_read, page_count);
    const id = uuidv4();
    
    try{
        const newShelfEntry = pool.query(`INSERT INTO shelf(id, title, author, publisher, email, publisher_date, thumbnail, categories, volume_id, date_read, page_count) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
    [id, title, author, publisher, userEmail, publisher_date, thumbnail, categories, volume_id, date_read, page_count]);
    res.json(newShelfEntry);
    }catch(err){
        console.error(err);
    }
})

//remove a book from shelf
app.post('/api/shelf/:userEmail/remove', async (req: Request, res: Response) =>{
    const {volume_id} = req.body;
    try{
    const removeFromShelf = pool.query(`DELETE FROM shelf WHERE volume_id=$1`,
    [volume_id]);
    const removeFromNotes = pool.query(`DELETE FROM notes WHERE volume_id=$1`,
        [volume_id]);

    res.json(removeFromShelf);
    res.json(removeFromNotes);
    }catch(err){
        console.error(err);
    }
})

//add a note to a book
app.post('/api/shelf/:userEmail/notes', async (req: Request, res: Response) =>{
    const {userEmail} = req.params;    
    const {title, volume_id, note, type, index_info} = req.body;
    console.log(title, volume_id, note, type, index_info);
    const id = uuidv4();
    const date = new Date();
    const comment_date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    
    try{
        const newShelfEntry = pool.query(`INSERT INTO notes(id, title, note, volume_id, email, comment_date, type, index_info) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
    [id, title, note, volume_id, userEmail, comment_date, type, index_info]);
    res.json(newShelfEntry);
    }catch(err){
        console.error(err);
    }
})
//change tag("Read", "To Be Read", "Reading")
app.post('/api/shelf/:userEmail/change', async (req: Request, res: Response) =>{
    const {categories, volume_id} = req.body;
    console.log(categories, volume_id);
    
    try{
        const newShelfEntry = pool.query(`UPDATE shelf SET categories = $1 WHERE volume_id = $2`,
    [categories, volume_id]);
    res.json(newShelfEntry);
    }catch(err){
        console.error(err);
    }
})

//endpoint for signup
app.post('/api/signup', async(req, res) => {
    const {user_name, email, password} = req.body;

    //maybe read documentation on this
    const salt = Bcrypt.genSaltSync(10);
    const hashe_password = Bcrypt.hashSync(password, salt);
    try{
        pool.query(`INSERT INTO users(user_name, email, hashed_password) VALUES($1, $2, $3)`, 
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

app.post('/api/login', async(req, res) => {
    const {user_name, email, password} = req.body;
    try{
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(users && !users.rows.length) {
            return res.json({detail: "User does not exist!"});
        }
        const success = await Bcrypt.compare(password, users.rows[0].hashed_password);
        const token = jwt.sign({email}, "secret", {expiresIn: "1hr"});
        if(success){
            res.json({"email": users.rows[0].email, token, "user_name": user_name});
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