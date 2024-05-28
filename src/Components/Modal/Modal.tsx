import { useState } from "react";
import "./Modal.css";
import { useCookies } from "react-cookie";

type Props = {
  showModal: boolean;
  item: any;
  data: Object;
  onClose: () => void;
};

const Modal = ({ showModal, item, data, onClose }: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies(undefined);
  const [readMore, setReadMore] = useState(false);
  const userEmail = cookies.Email;

  if (!showModal) {
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

  let read = "Read More";
  if (readMore) read = "Read Less";
  else read = "Read More";

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
              <h1 className="title">{item.volumeInfo.title}</h1>
              <h3 className="authors">{item.volumeInfo.authors}</h3>
              <h4 className="publisher">
                {item.volumeInfo.publisher}{" "}
                <span>{item.volumeInfo.publishedDate}</span>
              </h4>
              <div className="star-rating">
                <p className="page-count">{item.volumeInfo.pageCount} pages</p>
                {item.volumeInfo.averageRating && (
                  <>
                    <p className="rating">{item.volumeInfo.averageRating}</p>
                    <i className="rating fa-solid fa-star" />
                  </>
                )}
              </div>
              <div className="categories">
                <div className="tags">{item.volumeInfo.categories[0]}</div>
              </div>
              <br></br>
            </div>
          </div>
          <div className="tag-buttons">
            <button className="want-to-read" onClick={addToShelf}>
              Read
            </button>
            <button className="want-to-read" onClick={addToShelf}>
              Want to Read
            </button>
            <button className="want-to-read" onClick={addToShelf}>
              Reading
            </button>
          </div>
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
        </div>
      </div>
    </>
  );
};

export default Modal;
