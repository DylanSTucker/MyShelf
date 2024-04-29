import "./Home.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Feed from "../../Components/Feed/Feed";
import { useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";

const Home = () => {
  const google_api_key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);
  const searchBook = (evt: { key: string }) => {
    if (evt.key === "Enter") {
      axios
        .get(
          //im not certain but i think api keys should be stored in .env files
          //do that before making git repo
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&key=" +
            google_api_key +
            "&maxResults=40"
        )
        .then((res) => setData(res.data.items))
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <Navbar search={search} setSearch={setSearch} searchBook={searchBook} />
      <Sidebar />
      <div className={`container`}>
        <Feed bookData={bookData} />
      </div>
    </>
  );
};

export default Home;
