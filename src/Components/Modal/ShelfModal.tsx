import { FormEvent, useEffect, useState } from "react";
import "./ShelfModal.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { getBookInfo } from "../../scripts/scrape";

type Props = {
  showModal: boolean;
  item: any;
  onClose: () => void;
};
interface bookNotesEntry {
  title: string;
  note: string;
  volume_id: string;
  email: string;
}

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
  const [tab, setTab] = useState("details");
  const userEmail = cookies.Email;
  const [bookNotes, setBookNotes] = useState<bookNotesEntry[]>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVERURL}/shelf/${userEmail}/notes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: item.title,
            note: formJson.content,
            volume_id: item.volume_id,
            email: userEmail,
          }),
        }
      );
      if (response.status === 200) {
        console.log("worked");
      }
    } catch (err) {
      console.error(err);
    }
    //window.location.reload();
  };

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

  const getNotes = async () => {
    const req = await fetch(
      `${import.meta.env.VITE_SERVERURL_NOTES_USER}/${userEmail}/${
        item.volume_id
      }`
    );
    const res = await req.json();
    setBookNotes(res);
    console.log(res[0].note);
  };

  //call getBookInfo() when the book(item) that user is looking at changes
  useEffect(() => {
    getBookInfo(item.volume_id, setData);
    getNotes();
  }, [item]);

  //dont show modal
  if (!showModal) {
    return null;
  }

  let read = "Read More";
  if (readMore) read = "Read Less";
  else read = "Read More";

  //item.categories is a string, so format into array
  let categories = item.categories.split(",");
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
                {categories?.map((category: string) => (
                  <div className="tags">{category}</div>
                ))}
              </div>
              <br></br>
            </div>
          </div>
          <div className="tag-buttons">
            <button className="remove" onClick={() => removeFromShelf()}>
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
          <div className="tabs">
            <div className="btns">
              <button
                className={
                  tab == "details" ? "btn-details-selected" : "btn-details"
                }
                onClick={() => setTab("details")}
              >
                Details
              </button>
              <button
                className={tab == "notes" ? "btn-notes-selected" : "btn-notes"}
                onClick={() => setTab("notes")}
              >
                Notes
              </button>
            </div>
            {tab == "details" && (
              <div className="tab-details">
                <div id="desc" className="description">
                  <h4 className={readMore ? "more" : "less"}>
                    {data.description}
                  </h4>
                  <button
                    className="read-more-button"
                    onClick={() => {
                      setReadMore(readMore ? false : true);
                    }}
                  >
                    {read}
                  </button>
                </div>
              </div>
            )}
            {tab == "notes" && (
              <div className="tab-notes">
                <div className="notes">
                  <form method="post" onSubmit={(e) => handleSubmit(e)}>
                    <textarea name="content" className="notes-field" />
                    <button type="submit">Submit</button>
                  </form>
                  <div className="notes-display">
                    {bookNotes?.map((entry: bookNotesEntry) => (
                      <>{entry.note}</>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShelfModal;
