import { useState } from "react";
import "./Modal.css";
import { useCookies } from "react-cookie";

type Props = {
  showModal: boolean;
  item: any;
  onClose: () => void;
};

const Modal = ({ showModal, item, onClose }: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies(undefined);
  const [readMore, setReadMore] = useState(false);
  const userEmail = cookies.Email;

  //this function should remove the displayed book from the shelf database
  const removeFromShelf = async () => {
    console.log("removed");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVERURL_SHELF_USER}/${userEmail}/remove`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
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

  if (!showModal) {
    return null;
  }

  let read = "Read More";
  if (readMore) read = "Read Less";
  else read = "Read More";
  item.book_author = item.book_author.replace(/{|}|"|/g, "");
  let categories = [];
  if (item.category) categories = item.category.split(",");

  return (
    <>
      <div className="overlay">
        <div className="overlay-inner">
          <button className="close" onClick={onClose}>
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
          <div className="inner-box">
            <div className="modal-imgs">
              <img src={item.thumbnail} alt="" className="thumbnail" />
              <div className="background-modal">
                <img src={item.thumbnail} className="background-modal-img" />
              </div>
            </div>
            <div className="info">
              <h1 className="title">{item.book_title}</h1>
              <h3 className="authors">{item.book_author}</h3>
              <h4 className="publisher">
                {item.book_publisher} <span>{item.date}</span>
              </h4>
              {/*
                            <div className="star-rating">
                <p className="page-count">{item.volumeInfo.pageCount} pages</p>
                {item.volumeInfo.averageRating && (
                  <>
                    <p className="rating">{item.volumeInfo.averageRating}</p>
                    <i className="rating fa-solid fa-star" />
                  </>
                )}
              </div>
              */}
              <div className="categories">
                {categories.map((category: string) => (
                  <div className="tags">{category}</div>
                ))}
              </div>
              <br></br>
            </div>
          </div>
          <div className="tag-buttons">
            <button className="Remove" onClick={() => removeFromShelf()}>
              Remove
            </button>
            {/*
                            <button className="want-to-read" onClick={() => addToShelf("Read")}>
              Read
            </button>
            <button
              className="want-to-read"
              onClick={() => addToShelf("Want To Read")}
            >
              Want to Read
            </button>
            <button
              className="want-to-read"
              onClick={() => addToShelf("Reading")}
            >
              Reading
            </button>
                */}
          </div>
          {/*
                    <div className="description">
            <h4 className={readMore ? "more" : "less"}>
              {item.volumeInfo.description}
            </h4>
            <button
              className="read-more-button"
              onClick={() => setReadMore(readMore ? false : true)}
            >
              {read}
            </button>
          </div>
          */}
        </div>
      </div>
    </>
  );
};

export default Modal;
