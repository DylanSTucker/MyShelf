import { useState } from "react";
import "./Modal.css";
type Props = {
  show: boolean;
  item: any;
  data: Object;
  onClose: () => void;
};

const Modal = ({ show, item, data, onClose }: Props) => {
  if (!show) {
    return null;
  }
  let thumbnail =
    item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;

  const addToShelf = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(data);
    try {
      const response = await fetch(`http://localhost:8000/shelf/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log("worked");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="overlay">
        <div className="overlay-inner">
          <button className="close" onClick={onClose}>
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
          <div className="inner-box">
            <img src={thumbnail} alt=""></img>
            <div className="info">
              <h1>{item.volumeInfo.title}</h1>
              <h3>{item.volumeInfo.authors}</h3>
              <h4>
                {item.volumeInfo.publisher}
                <span>{item.volumeInfo.publishedDate}</span>
              </h4>
              <br></br>
              <a href={item.volumeInfo.previewLink}>
                <button className="more">More</button>
              </a>
              <button onClick={addToShelf}>Add To Shelf</button>
            </div>
          </div>
          <h4 className="description">{item.volumeInfo.description}</h4>
        </div>
      </div>
    </>
  );
};

export default Modal;
