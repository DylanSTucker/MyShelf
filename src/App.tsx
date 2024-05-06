//import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login-Signup/Login";
import SignUp from "./Pages/Login-Signup/SignUp";
import { useEffect, useState } from "react";

type taskTypes = Object[];

function App() {
  //const [sidebar, setSidebar] = useState(true);

  //Sort by date
  //const sortedTasks = tasks?.sort((a: { date: string | number | Date; },b: { date: string | number | Date; }) => new Date(a.date) - new Date(b.date));
  //console.log(tasks?.map((item: any) => item.book_title)[0]);
  return (
    <div>
      {/*<Navbar />*/}
      <Routes>
        {/*<Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />*/}
        <Route path="/" element={<Home />} />
        {/* create route to book and notes when user clicks on a book (see 29:28 in tutorial video)*/}
      </Routes>
    </div>
  );
}

export default App;
