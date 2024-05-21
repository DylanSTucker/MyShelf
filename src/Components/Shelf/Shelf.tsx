import BookCard from "../ShelfCards/BookCard";
import "./Shelf.css";

type Props = {
  itemInfo: Object[];
};

const Shelf = (props: Props) => {
  return (
    <div className="shelf">
      {props.itemInfo?.map((item: any) => (
        <BookCard
          book_title={item.book_title}
          book_author={item.book_author}
          book_publisher={item.book_publisher}
          thumbnail={item.thumbnail}
        />
      ))}
    </div>
  );
};

export default Shelf;
