type Props = {
  //key: string;
  book_title: string;
  book_author: string;
  //book_publisher: string;
};

const BookCard = (props: Props) => {
  console.log(props.book_title);
  return <div className="card">{props.book_author}</div>;
};

export default BookCard;
