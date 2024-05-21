import { useState } from "react";
import "./Modal.css";
import { useCookies } from "react-cookie";

type Props = {
  show: boolean;
  item: any;
  data: Object;
  onClose: () => void;
};

const Modal = ({ show, item, data, onClose }: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies(undefined);
  const userEmail = cookies.Email;

  if (!show) {
    return null;
  }
  let thumbnail =
    item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;

  const addToShelf = async () => {
    console.log(data);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVERURL_SHELF_USER}/${userEmail}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log("worked");
      }
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  };
  return (
    <>
      <div className="overlay">
        <div className="overlay-inner">
          <button className="close" onClick={onClose}>
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
          <div className="inner-box">
            <img src={thumbnail} alt="" className="thumbnail" />
            <div className="info">
              <h1>{item.volumeInfo.title}</h1>
              <h3>{item.volumeInfo.authors}</h3>
              <h4>
                {item.volumeInfo.publisher}
                <span>{item.volumeInfo.publishedDate}</span>
              </h4>
              <br></br>
              <button onClick={addToShelf}>Read</button>
              <button className="want-to-read" onClick={addToShelf}>
                Want to Read
              </button>
            </div>
          </div>
          <h4 className="description">{item.volumeInfo.description}</h4>
        </div>
      </div>
    </>
  );
};

export default Modal;
