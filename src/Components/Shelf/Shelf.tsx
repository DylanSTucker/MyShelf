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
  console.log(props.itemInfo.length);
  return (
    <>
    {props.itemInfo.length<=0 && (
      <h1 className="no-books">There are no books in your shelf</h1>
    )}
      {!showModal && (
        <div className="shelf">
          {props.itemInfo?.map((item: any) => (
            <BookCard
              data={item}
              title={item.title}
              author={item.author}
              publisher={item.publisher}
              thumbnail={item.thumbnail}
              categories={item.categories}
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
