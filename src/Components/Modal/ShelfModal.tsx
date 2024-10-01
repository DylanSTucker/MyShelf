import { useEffect, useState } from "react";
import "./ShelfModal.css";
import { useCookies } from "react-cookie";
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
  comment_date: string;
}

const ShelfModal = ({ showModal, item, onClose }: Props) => {
  const [cookies] = useCookies(undefined);
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
  const username = cookies.UserName;
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
        `${process.env.SERVERURL_SHELF_USER}` + `/${userEmail}/notes`,
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
    window.location.reload();
  };

  //this function should remove the displayed book from the shelf database
  const removeFromShelf = async () => {
    try {
      const response = await fetch(
        `${process.env.SERVERURL_SHELF_USER}/${userEmail}/remove`,
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
      `${process.env.SERVERURL}/api/notes/${userEmail}/${item.volume_id}`
    );
    const res = await req.json();
    setBookNotes(res);
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

  //change tag("Read", "To Be Read", "Reading")
  const changeTag = async (newTag: string) => {
    console.log(newTag);
    categories[categories.length - 1] = newTag;
    const str = categories.toString();
    item.categories = str;

    try {
      const response = await fetch(
        `${process.env.SERVERURL_SHELF_USER}/${userEmail}/change`,
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
  };
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
            <div className="shelf-book-info">
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
                  <div className="tags"><p>{category}</p></div>
                ))}
              </div>
              <br></br>
            </div>
          </div>

          <div className="tag-selector">
            <select
              className="selector"
              name="status"
              id="status"
              onChange={(e) => changeTag(e.target.value)}
            >
              <option
                className="option"
                value="Read"
                selected={categories[categories.length - 1] == "Read"}
              >
                Read
              </option>
              <option
                className="option"
                value="To Be Read"
                selected={categories[categories.length - 1] == "To Be Read"}
              >
                To Be Read
              </option>
              <option
                className="option"
                value="Reading"
                selected={categories[categories.length - 1] == "Reading"}
              >
                Reading
              </option>
            </select>
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
                    <br></br>
                    <button type="submit">Submit</button>
                  </form>
                  <div className="notes-display">
                    <ul className="notes-list">
                      {bookNotes?.map((entry: bookNotesEntry) => (
                        <li className="note">
                          <p className="comment-info">
                            {username}
                            <br></br>
                            {entry.comment_date}
                          </p>
                          <p className="comment">{entry.note}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="remove-container">
        <button className="remove" onClick={() => removeFromShelf()}>
          Remove
        </button>
      </div>
    </>
  );
};

export default ShelfModal;
