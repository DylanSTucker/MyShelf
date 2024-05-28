import { useState } from "react";
import BookCard from "../ShelfCards/BookCard";
import "./Shelf.css";

type Props = {
  itemInfo: Object[];
  filters: Set<string>;
};

const Shelf = (props: Props) => {
  const handleClick = () => {};

  return (
    <div className="shelf">
      {props.itemInfo?.map((item: any) => (
        <BookCard
          book_title={item.book_title}
          book_author={item.book_author}
          book_publisher={item.book_publisher}
          thumbnail={item.thumbnail}
          category={item.category}
        />
      ))}
    </div>
  );
};

export default Shelf;
