import "./Card.css";
import { useState } from "react";
import { useCookies } from "react-cookie";

interface bookData {
  book_title: String;
  book_author: String;
  book_publisher: String;
  email: String;
  date: Date;
  thumbnail: String;
  category: String;
}

interface Props {
  book: any;
  setData: (data: bookData) => void;
  setBookItem: (item: Object) => void;
  setShowModal: (showModal: boolean) => void;
}

const Card = (props: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies(undefined);
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
            props.setData({
              book_title: props.book.volumeInfo.title,
              book_author: props.book.volumeInfo.authors,
              book_publisher: props.book.volumeInfo.publisher,
              email: cookies.Email,
              date: new Date(),
              thumbnail: props.book.volumeInfo.imageLinks.thumbnail,
              category: props.book.volumeInfo.categories,
            });
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
