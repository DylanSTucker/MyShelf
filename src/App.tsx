//import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login-Signup/Login";
import SignUp from "./Pages/Login-Signup/SignUp";
import { useEffect, useState } from "react";

function App() {
  //const [sidebar, setSidebar] = useState(true);
  const [tasks, setTasks] = useState(null);
  const getData = async () => {
    const userEmail = "something@outlook.com";
    try {
      const response = await fetch(`http://localhost:8000/shelf/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(tasks);

  //Sort by date

  return (
    <div>
      {/*<Navbar />*/}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/*<Route path="/" element={<Home />} />*/}
        {/* create route to book and notes when user clicks on a book (see 29:28 in tutorial video)*/}
      </Routes>
    </div>
  );
}

export default App;
