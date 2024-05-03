import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) =>{
    res.send("hello world");
});

const PORT = import.meta.env.PORT;

app.listen(PORT, () =>{
    console.log("server started successfully");
});

export const MyShelf = app;