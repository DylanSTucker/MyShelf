import "./Home.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Feed from "../../Components/Feed/Feed";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import Shelf from "../../Components/Shelf/Shelf";

type Props = {
  itemInfo: Object[];
};

const Home = (props: Props) => {
  const google_api_key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  const [shelf, setShelf] = useState(true);
  const [sidebar, setSidebar] = useState(true);
  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);
  const searchBook = (evt: { key: string }) => {
    if (evt.key === "Enter") {
      axios
        .get(
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
  console.log(bookData);

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        searchBook={searchBook}
        setSidebar={setSidebar}
        sidebar={sidebar}
        shelf={shelf}
        setShelf={setShelf}
      />
      <Sidebar sidebar={sidebar} shelf={shelf} setShelf={setShelf} />
      <div className={shelf ? "container" : "d-none"}>
        {<Shelf itemInfo={props.itemInfo} />}
      </div>
      <div className={!shelf ? "container" : "d-none"}>
        <Feed bookData={bookData} />
      </div>
    </>
  );
};

export default Home;
