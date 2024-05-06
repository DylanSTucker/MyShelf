import "./Home.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Feed from "../../Components/Feed/Feed";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import Shelf from "../../Components/Shelf/Shelf";

type taskTypes = Object[];

const Home = () => {
  const google_api_key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  const [shelf, setShelf] = useState(true);
  const [sidebar, setSidebar] = useState(true);
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

  const [tasks, setTasks] = useState<taskTypes>();
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
  /*        {tasks.map(
          (item: {
            id: string;
            book_title: string;
            book_author: string;
            book_publisher: string;
          }) => (
            <Shelf
              key={item.id}
              book_title={item.book_title}
              book_author={item.book_author}
              book_publisher={item.book_publisher}
            />
    */

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        searchBook={searchBook}
        setSidebar={setSidebar}
        sidebar={sidebar}
      />
      <Sidebar sidebar={sidebar} shelf={shelf} setShelf={setShelf} />
      <div className={shelf ? "container" : "d-none"}>
        <Feed bookData={bookData} />

        {/*Using '!' is not a good solution. 
        It tells typescript that 'tasks' will not be null, but it could be in some instances. Find a better solution */}
        {<Shelf tasks={tasks!} />}
      </div>
    </>
  );
};

export default Home;
