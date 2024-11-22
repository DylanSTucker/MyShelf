import "./Feed.css";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";

interface Props {
  allBookData: Object[];
  search: string;
  searchUpdate: boolean;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setSearchUpdate: (searchUpdate: boolean) => void;
}

let query = "";

//search feed
const Feed = (props: Props) => {
  //const [showModal, setShowModal] = useState(false);
  const [bookItem, setBookItem] = useState<object>();

  if (props.searchUpdate) {
    query = props.search;
  }

  useEffect(() => {
    props.setSearchUpdate(false);
  }, [query]); //only re-run the effect if query changes
  return (
    <div className="fd">
      {query && !props.showModal && (
        <div className="query">
          <h2>Search results for "{query}"</h2>
        </div>
      )}
      {!props.showModal && (
        <div className="feed">
          {props.allBookData.map((book: any) => (
            <Card
              book={book}
              setBookItem={setBookItem}
              setShowModal={props.setShowModal}
            />
          ))}
        </div>
      )}
      {props.showModal && (
        <Modal
          showModal={props.showModal}
          item={bookItem}
          onClose={() => props.setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Feed;
