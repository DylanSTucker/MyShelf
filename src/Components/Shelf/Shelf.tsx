import { useState } from "react";
import BookCard from "../ShelfCards/BookCard";
import ShelfModal from "../Modal/ShelfModal";
import "./Shelf.css";

type Props = {
  itemInfo: Object[];
  filters: Set<string>;
};

const Shelf = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [bookItem, setBookItem] = useState<Object>();

  const handleClick = (show: boolean) => {
    setShowModal(show);
  };

  return (
    <>
      {!showModal && (
        <div className="shelf">
          {props.itemInfo?.map((item: any) => (
            <BookCard
              data={item}
              book_title={item.book_title}
              book_author={item.book_author}
              book_publisher={item.book_publisher}
              thumbnail={item.thumbnail}
              category={item.category}
              setShowModal={setShowModal}
              setBookItem={setBookItem}
            />
          ))}
        </div>
      )}
      {showModal && (
        <ShelfModal
          showModal={showModal}
          item={bookItem}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Shelf;
