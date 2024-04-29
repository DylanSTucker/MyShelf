//import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Book from "./Pages/Books/Book";

function App() {
  //const [sidebar, setSidebar] = useState(true);

  return (
    <div>
      {/*<Navbar />*/}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Books/:categoryId/:bookId" element={<Book />} />
        {/* create route to book and notes when user clicks on a book (see 29:28 in tutorial video)*/}
      </Routes>
    </div>
  );
}

export default App;
