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
let filters = new Set<string>();

const Home = (props: Props) => {
  const google_api_key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  const [shelf, setShelf] = useState(true);
  const [sidebar, setSidebar] = useState(true);
  const [search, setSearch] = useState("");
  const [searchUpdate, setSearchUpdate] = useState(true);
  const [allBookData, setAllBookData] = useState([]);
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
        .then((res) => setAllBookData(res.data.items))
        .catch((err) => console.log(err));
    }
  };
  const resetFilters = () => {
    setSeed(Math.random());
  };

  //this function is very slow @  >= O(n^2)
  const filterCategories = (data: object[]): object[] => {
    if (filters.size < 1 || data.length < 1) return data;
    let newData: object[] = [];
    let duplicates = new Set<object>([]);
    //console.log(data[0].title);
    data.forEach((item: object) => {
      if ("categories" in item) {
        let str: string[] = [];
        try {
          str = String(item.categories).split(",");
          console.log(str);
          str.forEach((i: string) => {
            if (filters.has(i) && !duplicates.has(item)) {
              newData.push(item);
              duplicates.add(item);
              console.log(duplicates);
            }
          });
        } catch (error) {
          let errorMessage = "Failed to do something exceptional";
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          console.log(errorMessage);
        }

        //str.forEach((i: string) => console.log(i.replace(/[^a-zA-Z ]/g, "")));
        console.log(str);
      }
    });
    return newData;
  };
  const removeFilters = (filter: string) => {
    filters.delete(filter);
    resetFilters();
  };

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
        <Shelf itemInfo={filterCategories(props.itemInfo)} filters={filters} />
      </div>
      <div className={!shelf ? "container" : "d-none"}>
        <Feed
          allBookData={allBookData}
          search={search}
          searchUpdate={searchUpdate}
          setSearchUpdate={setSearchUpdate}
        />
      </div>
    </>
  );
};

export default Home;
