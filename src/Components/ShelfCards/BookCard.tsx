type Props = {
  //key: string;
  book_title: string;
  book_author: string;
  //book_publisher: string;
  thumbnail: string;
};

const BookCard = (props: Props) => {
  return (
    <div className="card">
      <img src={props.thumbnail} />
      <div>
        <h3 className="title">{props.book_title}</h3>
        <p className="authors">{props.book_author}</p>
      </div>
    </div>
  );
};

export default BookCard;
