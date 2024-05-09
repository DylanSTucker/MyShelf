import BookCard from "../ShelfCards/BookCard";
import "./Shelf.css";

type Props = {
  itemInfo: Object[];
};

const Shelf = (props: Props) => {
  return (
    <div className="shelf container">
      <div className="row justify-content-start">
        {props.itemInfo?.map((item: any) => (
          <div className="col-sm">
            <BookCard
              book_title={item.book_title}
              book_author={item.book_author}
              thumbnail={item.thumbnail}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shelf;
