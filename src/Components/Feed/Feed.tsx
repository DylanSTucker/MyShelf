import "./Feed.css";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface Props {
  allBookData: Object[];
  search: string;
  searchUpdate: boolean;
  setSearchUpdate: (searchUpdate: boolean) => void;
  setFeed: (feed: boolean) => void;
}

//defines bookData type
interface bookData {
  book_title: String;
  book_author: String;
  book_publisher: String;
  email: String;
  date: Date;
  thumbnail: String;
  categories: String;
  volume_id: String;
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
    categories: "",
    volume_id: "",
  });

  if (props.searchUpdate) {
    query = props.search;
  }

  useEffect(() => {
    props.setSearchUpdate(false);
    props.setFeed(true);
  }, [query]); //only re-run the effect if query changes
  return (
    <div className="feed-container">
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
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Feed;
