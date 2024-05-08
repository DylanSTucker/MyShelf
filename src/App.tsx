//import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login-Signup/Login";
import SignUp from "./Pages/Login-Signup/SignUp";
import { useEffect, useState } from "react";

type infoTypes = Object[];

function App() {
  //const [sidebar, setSidebar] = useState(true);

  //Sort by date
  //const sortedTasks = tasks?.sort((a: { date: string | number | Date; },b: { date: string | number | Date; }) => new Date(a.date) - new Date(b.date));
  //console.log(tasks?.map((item: any) => item.book_title)[0]);

  const [info, setInfo] = useState<infoTypes>();
  //this function should be created in the app.tsx file and passed through Home.tsx and anywhere else it needs to go
  const getData = async () => {
    const userEmail = "something@outlook.com";
    try {
      const response = await fetch(`http://localhost:8000/shelf/${userEmail}`);
      const json = await response.json();
      setInfo(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  let itemInfo: Object[] = info || [];

  return (
    <div>
      {/*<Navbar />*/}
      <Routes>
        {/*<Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />*/}

        {/*Using '!' is not a good solution. 
        It tells typescript that 'tasks' will not be null, but it could be in some instances. Find a better solution */}
        <Route path="/" element={<Home itemInfo={itemInfo} />} />
        {/* create route to book and notes when user clicks on a book (see 29:28 in tutorial video)*/}
      </Routes>
    </div>
  );
}

export default App;
