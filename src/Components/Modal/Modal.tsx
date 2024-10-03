import { useEffect, useState } from "react";
import "./Modal.css";
import { useCookies } from "react-cookie";
import { getBookInfo } from "../../scripts/scrape";

type Props = {
  showModal: boolean;
  item: any;
  onClose: () => void;
};

const Modal = ({ showModal, item, onClose }: Props) => {
  const [cookies] = useCookies(undefined);
  const [readMore, setReadMore] = useState(false);
  const [data, setData] = useState<any>({
    title: "",
    author: "",
    publisher: "",
    publisher_date: "",
    thumbnail: "",
    categories: [],
    description: "",
    volume_id: "",
  });
  const userEmail = cookies.Email;

  if (!showModal) {
    return null;
  }
  let thumbnail =
    item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;

  /*
  Description: adds book to shelf through POST method
  */
  const addToShelf = async (tag: string) => {
    //push new tag ("Read", "Want To Read", "Reading") to categories array
    //should get categories from api call as it contains more information. Put this in a new function
    try {
      const response = await fetch(
        `${process.env.SERVERURL_SHELF_USER}/${userEmail}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: data.title,
            author: data.author,
            publisher: data.publisher,
            email: userEmail,
            publisher_date: data.publisher_date,
            thumbnail: data.thumbnail,
            categories: data.categories.toString() + "," + tag,
            volume_id: data.volume_id,
          }),
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

  useEffect(() => {
    getBookInfo(item.id, setData);
  }, [item]);

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
            <div className="modal-imgs">
              <img src={thumbnail} alt="" className="thumbnail" />
              <div className="background-modal">
                <img src={thumbnail} className="background-modal-img" />
              </div>
            </div>
            <div className="modal-info">
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
                {data.categories.map((category: string) => (
                  <div className="tags">{category}</div>
                ))}
              </div>
              <br></br>
            </div>
          </div>
          <div className="tag-buttons">
            <button className="want-to-read" onClick={() => addToShelf("Read")}>
              Read
            </button>
            <button
              className="want-to-read"
              onClick={() => addToShelf("To Be Read")}
            >
              To Be Read
            </button>
            <button
              className="want-to-read"
              onClick={() => addToShelf("Reading")}
            >
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
