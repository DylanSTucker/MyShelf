import BookCard from "../ShelfCards/BookCard";
import "./Shelf.css";

type Props = {
  tasks: Object[];
};

const Shelf = (props: Props) => {
  /*const sortedTasks = tasks
    .map((date: Date) => new Date(date))
    .sort((a: Date, b: Date) => a.getTime() - b.getTime());
    */
  return (
    <div className="shelf">
      {props.tasks?.map((item: any) => (
        <BookCard book_title={item.book_title} book_author={item.book_author} />
      ))}
    </div>
  );
};

export default Shelf;
