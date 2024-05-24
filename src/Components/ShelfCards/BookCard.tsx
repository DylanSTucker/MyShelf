import "./BookCards.css";
type Props = {
  //key: string;
  book_title: string;
  book_author: string;
  book_publisher: string;
  thumbnail: string;
  category: string;
};

const BookCard = (props: Props) => {
  const allAuthors = props.book_author.replace(/{|}|"|/g, "");
  return (
    <div className="bookCard">
      <img className="thumbnail" src={props.thumbnail} />

      <div className="background">
        <img src={props.thumbnail} />
      </div>

      <div className="title-container">
        <p className="title">{props.book_title}</p>
      </div>
      <div className="author-container">
        <p className="author">{allAuthors}</p>
      </div>
    </div>
  );
};

export default BookCard;
