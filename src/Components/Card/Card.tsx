import "./Card.css";
import { useState } from "react";
import { useCookies } from "react-cookie";

interface Props {
  bookData: Object[];
  setData: (data: Object) => void;
  setBookItem: (item: Object) => void;
  setShowModal: (showModal: boolean) => void;
}

const Card = (props: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies(undefined);

  return (
    <>
      {props.bookData.map((item: any) => {
        let thumbnail =
          item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail;
        if (thumbnail != undefined) {
          return (
            <>
              <div
                className="itemCard"
                onClick={() => {
                  props.setShowModal(true);
                  props.setBookItem(item);
                  props.setData({
                    book_title: item.volumeInfo.title,
                    book_author: item.volumeInfo.authors,
                    book_publisher: item.volumeInfo.publisher,
                    email: cookies.Email,
                    date: new Date(),
                    thumbnail: item.volumeInfo.imageLinks.thumbnail,
                    category: item.volumeInfo.categories,
                  });
                }}
              >
                <img className="thumbnail" src={thumbnail} alt="" />
                <div className="background">
                  <img src={thumbnail} alt="" />
                </div>

                <div className="title-container">
                  <p className="title">{item.volumeInfo.title}</p>
                </div>
                <div className="author-container">
                  <p className="author">{item.volumeInfo.authors}</p>
                </div>
              </div>
            </>
          );
        }
      })}
    </>
  );
};

export default Card;
