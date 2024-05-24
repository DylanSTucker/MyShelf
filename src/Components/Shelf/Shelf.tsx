import { useState } from "react";
import BookCard from "../ShelfCards/BookCard";
import "./Shelf.css";

type Props = {
  itemInfo: Object[];
  filters: Set<string>;
};

const Shelf = (props: Props) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {};

  return (
    <div>
      <div className="shelf">
        {props.itemInfo?.map((item: any) => (
          <div onClick={() => setIsSelected(true)}>
            <BookCard
              book_title={item.book_title}
              book_author={item.book_author}
              book_publisher={item.book_publisher}
              thumbnail={item.thumbnail}
              category={item.category}
            />
          </div>
        ))}
      </div>
      <div className={isSelected ? "fold-menu" : "fold-menu"}></div>
    </div>
  );
};

export default Shelf;
