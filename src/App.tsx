//import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login-Signup/Login";
import SignUp from "./Pages/Login-Signup/SignUp";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type infoTypes = Object[];

function App() {
  //Sort by date
  //const sortedTasks = tasks?.sort((a: { date: string | number | Date; },b: { date: string | number | Date; }) => new Date(a.date) - new Date(b.date));
  //console.log(tasks?.map((item: any) => item.book_title)[0]);
  const [cookies, setCookie, removeCookie] = useCookies(undefined);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  const [info, setInfo] = useState<infoTypes>();
  //this function should be created in the app.tsx file and passed through Home.tsx and anywhere else it needs to go
  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/shelf/${userEmail}`);
      const json = await response.json();
      setInfo(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);
  let itemInfo: Object[] = info || [];
  /*
We should probably make the login/signup into one page
*/
  return (
    <div>
      {/*<Navbar />*/}
      <Routes>
        {authToken && <Route path="/" element={<Home itemInfo={itemInfo} />} />}
        {!authToken && <Route path="/" element={<SignUp />} />}

        {/*Using '!' is not a good solution. 
        It tells typescript that 'tasks' will not be null, but it could be in some instances. Find a better solution */}

        {/* create route to book and notes when user clicks on a book (see 29:28 in tutorial video)*/}
      </Routes>
    </div>
  );
}

export default App;
