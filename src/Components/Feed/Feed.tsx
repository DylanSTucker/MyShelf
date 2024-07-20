import "./Feed.css";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";

interface Props {
  allBookData: Object[];
  search: string;
  searchUpdate: boolean;
  setSearchUpdate: (searchUpdate: boolean) => void;
}

let query = "";

//search feed
const Feed = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [bookItem, setBookItem] = useState<object>();

  if (props.searchUpdate) {
    query = props.search;
  }

  useEffect(() => {
    props.setSearchUpdate(false);
  }, [query]); //only re-run the effect if query changes
  return (
    <div className="fd">
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
