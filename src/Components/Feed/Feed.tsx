import "./Feed.css";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

interface Props {
  bookData: Object[];
  search: string;
  searchUpdate: boolean;
  setSearchUpdate: (searchUpdate: boolean) => void;
}
let query = "";

//search feed
const Feed = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [bookItem, setBookItem] = useState<object>();
  const [data, setData] = useState<object>({
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
          {
            <Card
              bookData={props.bookData}
              setData={setData}
              setBookItem={setBookItem}
              setShowModal={setShowModal}
            />
          }
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
