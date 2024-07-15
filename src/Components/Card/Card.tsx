import "./Card.css";


interface Props {
  book: any;
  setBookItem: (item: Object) => void;
  setShowModal: (showModal: boolean) => void;
}

const Card = (props: Props) => {
  let thumbnail =
    props.book.volumeInfo.imageLinks &&
    props.book.volumeInfo.imageLinks.thumbnail;
  if (thumbnail != undefined) {
    return (
      <>
        <div
          className="itemCard"
          onClick={() => {
            props.setShowModal(true);
            props.setBookItem(props.book);
          }}
        >
          <img
            className="thumbnail"
            src={props.book.volumeInfo.imageLinks.thumbnail}
            alt=""
          />
          <div className="background">
            <img src={props.book.volumeInfo.imageLinks.thumbnail} alt="" />
          </div>

          <div className="title-container">
            <p className="title">{props.book.volumeInfo.title}</p>
          </div>
          <div className="author-container">
            <p className="author">{props.book.volumeInfo.authors}</p>
          </div>
        </div>
      </>
    );
  } else {
    return;
  }
};

export default Card;
