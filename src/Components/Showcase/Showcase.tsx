import { useCookies } from "react-cookie";
import "./Showcase.css"
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
    book: any;
    setBookItem: (item: Object) => void;
    setShowModal: (showModal: boolean) => void;
    search: string;
  }

const Showcase = (props: Props) => {
    const google_api_key = process.env.GOOGLE_BOOKS_API_KEY;

    let thumbnail =
    props.book.volumeInfo.imageLinks &&
    props.book.volumeInfo.imageLinks.thumbnail;

    const [cookies] = useCookies(undefined);

    const [allBookData, setAllBookData] = useState([]);

    const searchBook = async () => {
        axios
        .get(
            "https://www.googleapis.com/books/v1/volumes?q=" + props.search +
            "&key=" +
            google_api_key +
            "&maxResults=1"
        )
        .then((res) => setAllBookData(res.data.items))
        .catch((err) => console.log(err));
      };
      useEffect(() => {
        if(!cookies.authToken){
            searchBook();
        }
      }, []); //only re-run the effect if query changes


  if (thumbnail != undefined) {
    return (
      <>
        <div
          className="itemShowcase"
          onClick={() => {
            props.setShowModal(true);
            props.setBookItem(props.book);
          }}
        >
          <img
            className="thumbnail"
            src={props.book.volumeInfo.imageLinks.thumbnail}
            alt=""
          />
          <div className="backgroundShowcase">
            <img src={props.book.volumeInfo.imageLinks.thumbnail} alt="" />
          </div>

          <div className="info-container">
            <p className="title">{props.book.volumeInfo.title}</p>
            <p className="author">{props.book.volumeInfo.authors}</p>
            <p className="publisher">{props.book.volumeInfo.publisher}</p>
            <p className="rating">{props.book.volumeInfo.averageRating}</p>
            <i className="rating fa-solid fa-star" />

            <p className="pageCount">{props.book.volumeInfo.pageCount} pages</p>
          </div>
        </div>
      </>
    );
  } else {
    return;
  }
}

export default Showcase;