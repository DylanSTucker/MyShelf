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
}

//defines bookData type
interface bookData {
  book_title: String;
  book_author: String;
  book_publisher: String;
  email: String;
  date: Date;
  thumbnail: String;
  category: String;
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
    category: "",
    volume_id: "",
  });

  if (props.searchUpdate) {
    query = props.search;
  }

  useEffect(() => {
    props.setSearchUpdate(false);
  }, [query]); //only re-run the effect if query changes
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
