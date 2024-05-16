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
  });

  return (
    <>
      {props.bookData.map((item: any) => {
        let thumbnail =
          item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail;
        let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
        if (thumbnail != undefined) {
          return (
            <>
              <div
                className="card"
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
                  });
                }}
              >
                <img src={thumbnail} alt="" />
                <div>
                  <h3 className="title">{item.volumeInfo.title}</h3>
                  <p className="amount">{amount}</p>
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
