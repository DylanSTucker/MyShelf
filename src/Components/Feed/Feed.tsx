import "./Feed.css";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

interface Props {
  allBookData: Object[];
  search: string;
  searchUpdate: boolean;
  setSearchUpdate: (searchUpdate: boolean) => void;
}
interface bookData {
  book_title: String;
  book_author: String;
  book_publisher: String;
  email: String;
  date: Date;
  thumbnail: String;
  category: String;
}

let query = "";

//search feed
const Feed = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [bookItem, setBookItem] = useState<object>();
  const [data, setData] = useState<bookData>({
    book_title: "",
    book_author: "",
    book_publisher: "",
    email: "",
    date: new Date(),
    thumbnail: "",
    category: "",
  });

  if (props.searchUpdate) {
    query = props.search;
    props.setSearchUpdate(false);
  }
  return (
    <div>
      {query && !showModal && (
        <div className="query">
          <h2>Search results for "{query}"</h2>
        </div>
      )}
      {!showModal && (
        <div className="feed">
          {props.allBookData.map((book: any) => (
            <Card
              book={book}
              setData={setData}
              setBookItem={setBookItem}
              setShowModal={setShowModal}
            />
          ))}
        </div>
      )}
      {showModal && (
        <Modal
          showModal={showModal}
          item={bookItem}
          data={data}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Feed;
