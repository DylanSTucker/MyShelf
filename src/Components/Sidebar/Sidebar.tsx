import "./Sidebar.css";
import { useCookies } from "react-cookie";

type Props = {
  sidebar: boolean;
  shelf: boolean;
  setShelf: (shelf: boolean) => void;
};

const Sidebar = (props: Props) => {
  const [cookies, setCookies, removeCookie] = useCookies(undefined);

  const signOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  return (
    <div className={`sidebar ${props.sidebar ? "" : "small-sidebar"}`}>
      <div className="shortcut-links">
        <div className="side-link" onClick={() => signOut()}>
          <i className="fa-solid fa-user" />
          <p>Profile</p>
        </div>
        <div
          className="side-link"
          onClick={() => props.setShelf(props.shelf === false ? true : false)}
        >
          <i className="fa-solid fa-book" />
          <p>My Shelf</p>
        </div>
        <div className="side-link">
          <i className="fa-solid fa-book-open" />
          <p>Reading</p>
        </div>
        <div className="side-link">
          <i className="fa-solid fa-bookmark" />
          <p>Want To Read</p>
        </div>
        <div className="side-link">
          <i className="fa-solid fa-chart-simple" />
          <p>Stats</p>
        </div>
        <div className="side-link">
          <i className="fa-solid fa-gear" />
          <p>Settings</p>
        </div>
      </div>
      <hr />
      <div className="genre-list">
        <h3>Non-Fiction</h3>
        <h3>Fiction</h3>
        <div className="side-link">
          <i className="fa-solid fa-atom" />
          <p>Sci-Fi</p>
        </div>
        <div className="side-link">
          <i className="fa-solid fa-dragon" />
          <p>Fantasy</p>
        </div>
        <div className="side-link">
          <i className="fa-solid fa-heart" />
          <p>Romance</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
