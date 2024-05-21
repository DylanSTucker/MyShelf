import BookCard from "../ShelfCards/BookCard";
import "./Shelf.css";

type Props = {
  itemInfo: Object[];
  filters: string[];
  passesFilter: (category: string) => boolean;
};

const Shelf = (props: Props) => {
  console.log(props.filters);
  return (
    <div className="shelf">
      {props.itemInfo?.map((item: any) => (
        <div className={props.passesFilter(item.category) ? "" : "d-none"}>
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
  );
};

export default Shelf;
