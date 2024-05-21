import "./Home.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Feed from "../../Components/Feed/Feed";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import Shelf from "../../Components/Shelf/Shelf";
import Filters from "../../Components/Filters/Filters";

type Props = {
  itemInfo: Object[];
};

//an array that holds filters for the shelf
let filters: string[] = [];

const Home = (props: Props) => {
  const google_api_key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  const [shelf, setShelf] = useState(true);
  const [sidebar, setSidebar] = useState(true);
  const [search, setSearch] = useState("");
  const [searchUpdate, setSearchUpdate] = useState(true);
  const [bookData, setData] = useState([]);
  const [seed, setSeed] = useState(1);
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
  const resetFilters = () => {
    setSeed(Math.random());
    passesFilter("");
  };
  const passesFilter = (category: string): boolean => {
    if (filters.length < 1 || category === "") {
      return true;
    }
    for (let i = 0; i < filters.length; i++) {
      if ('{"' + filters[i] + '"}' === category) {
        return true;
      }
    }
    return false;
  };
  const removeFilters = (filter: string) => {
    for (let i = 0; i < filters.length; i++) {
      if (filter === filters[i]) {
        filters.splice(i, 1);
      }
    }
    if (filters.length < 1) filters = [];
    resetFilters();
    passesFilter("");
  };

  console.log(bookData);

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        searchUpdate={searchUpdate}
        setSearchUpdate={setSearchUpdate}
        searchBook={searchBook}
        setSidebar={setSidebar}
        sidebar={sidebar}
        shelf={shelf}
        setShelf={setShelf}
      />
      <Sidebar
        sidebar={sidebar}
        shelf={shelf}
        setShelf={setShelf}
        filters={filters}
        resetFilters={resetFilters}
      />
      <div className={shelf ? "shelf-container" : "d-none"}>
        <Filters key={seed} filters={filters} removeFilters={removeFilters} />
        <Shelf
          itemInfo={props.itemInfo}
          filters={filters}
          passesFilter={passesFilter}
        />
      </div>
      <div className={!shelf ? "container" : "d-none"}>
        <Feed
          bookData={bookData}
          search={search}
          searchUpdate={searchUpdate}
          setSearchUpdate={setSearchUpdate}
        />
      </div>
    </>
  );
};

export default Home;
