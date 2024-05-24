import "./Card.css";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

interface Props {
  bookData: Object[];
}

const Card = (props: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies(undefined);

  const [show, setShow] = useState(false);
  const [bookItem, setBookItem] = useState();
  const [data, setData] = useState({
    book_title: "",
    book_author: "",
    book_publisher: "",
    email: cookies.Email,
    date: new Date(),
    thumbnail: "",
    category: "",
  });

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
                  setShow(true);
                  setBookItem(item);
                  setData({
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
              <Modal
                show={show}
                item={bookItem}
                data={data}
                onClose={() => setShow(false)}
              />
            </>
          );
        }
      })}
    </>
  );
};

export default Card;
