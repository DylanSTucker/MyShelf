import { useEffect, useState } from "react";
import "./ShelfModal.css";
import { useCookies } from "react-cookie";
import axios from "axios";

type Props = {
  showModal: boolean;
  item: any;
  onClose: () => void;
};
const ShelfModal = ({ showModal, item, onClose }: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies(undefined);
  const [data, setData] = useState<any>({
    title: "",
    author: "",
    publisher: "",
    publisherDate: "",
    categories: [],
    thumbnail: "",
    description: "",
  });

  const [readMore, setReadMore] = useState(false);
  const userEmail = cookies.Email;

  //this function should remove the displayed book from the shelf database
  const removeFromShelf = async () => {
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

  //this function may also be too slow with the .split.join calls
  const getBookInfo = async () => {
    const id = item.volume_id;
    //scrape the data needed from googles api
    axios
      .get("https://www.googleapis.com/books/v1/volumes/" + id)
      .then((res) => {
        const str = res.data.volumeInfo.description;
        setData({
          title: res.data.volumeInfo.title,
          author: res.data.volumeInfo.author,
          publisher: res.data.volumeInfo.publisher,
          publisherDate: res.data.volumeInfo.publishedDate,
          categories: res.data.volumeInfo.categories[0]
            .split("/")
            .concat([item.category]),
          thumbnail: res.data.volumeInfo.imageLinks.thumbnail,
          //remove HTML tags in string, before setting the description with clean text
          description: str.split(/<[^>]*>/).join(""),
        });
      })
      .then(() => data.categories.push(item.category))
      .catch((err) => console.log(err));
  };

  //call getBookInfo() when the book(item) that user is looking at changes
  useEffect(() => {
    getBookInfo();
  }, [item]);

  if (!showModal) {
    return null;
  }

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
              <img src={data.thumbnail} alt="" className="thumbnail" />
              <div className="background-modal">
                <img src={data.thumbnail} className="background-modal-img" />
              </div>
            </div>
            <div className="info">
              <h1 className="title">{data.title}</h1>
              <h3 className="authors">{data.author}</h3>
              <h4 className="publisher">
                {data.publisher} <span>{data.publisherDate}</span>
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
                {data.categories?.map((category: string) => (
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

          <div id="desc" className="description">
            <h4 className={readMore ? "more" : "less"}>{data.description}</h4>
            <button
              className="read-more-button"
              onClick={() => {
                setReadMore(readMore ? false : true);
              }}
            >
              {read}
            </button>
          </div>

          <div className="notes">
            <form>
              <textarea className="notes-field" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShelfModal;
