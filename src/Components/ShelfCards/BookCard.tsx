import { useState } from "react";
import "./BookCards.css";
type Props = {
  //key: string;
  data: Object;
  title: string;
  author: string;
  publisher: string;
  thumbnail: string;
  categories: string;
  setShowModal: (showModal: boolean) => void;
  setBookItem: (data: Object) => void;
};

const BookCard = (props: Props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const allAuthors = props.author;

  const handleClick = () => {
    props.setBookItem(props.data);
    props.setShowModal(true);
  };

  return (
    <div onClick={() => handleClick()}>
      <div className="bookCard" onClick={() => setOpenMenu(!openMenu)}>
        <img className="thumbnail" src={props.thumbnail} />

        <div className="background">
          <img src={props.thumbnail} />
        </div>

        <div className="title-container">
          <p className="title">{props.title}</p>
        </div>
        <div className="author-container">
          <p className="author">{allAuthors}</p>
        </div>
      </div>
      {openMenu && <div className={"dropdown-menu"}>Hello world</div>}
    </div>
  );
};

export default BookCard;
