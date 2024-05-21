import "./Sidebar.css";
import { useCookies } from "react-cookie";

type Props = {
  sidebar: boolean;
  shelf: boolean;
  setShelf: (shelf: boolean) => void;
  filters: string[];
  resetFilters: () => void;
};

const Sidebar = (props: Props) => {
  const [cookies, setCookies, removeCookie] = useCookies(undefined);

  const signOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };
  const addFilter = (filter: string) => {
    //return if this is a duplicate
    let isDuplicate = false;
    props.filters.forEach((item: string) => {
      if (item == filter) {
        isDuplicate = true;
      }
    });
    if (isDuplicate) return;
    //add to filters array if it is not a duplicate
    props.filters.push(filter);
    props.resetFilters();
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
        <div className="side-link" onClick={() => addFilter("Reading")}>
          <i
            className="fa-solid fa-book-open-reader"
            onClick={() => addFilter("Reading")}
          />
          <p>Reading</p>
        </div>
        <div className="side-link" onClick={() => addFilter("Read")}>
          <i className="fa-solid fa-book-open" />
          <p>Read</p>
        </div>
        <div className="side-link" onClick={() => addFilter("Want to Read")}>
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
        <div className="side-link" onClick={() => addFilter("Science")}>
          <i className="fa-solid fa-flask" />
          <p>Science</p>
        </div>
        <div className="side-link" onClick={() => addFilter("Self-Help")}>
          <i className="fa-solid fa-handshake-angle" />
          <p>Self-Help</p>
        </div>
        <div className="side-link" onClick={() => addFilter("History")}>
          <i className="fa-solid fa-landmark" />
          <p>History</p>
        </div>
        <div className="side-link" onClick={() => addFilter("Fiction")}>
          <p>Fiction</p>
        </div>
        <div className="side-link" onClick={() => addFilter("Sci-Fi")}>
          <i className="fa-solid fa-atom" />
          <p>Sci-Fi</p>
        </div>
        <div className="side-link" onClick={() => addFilter("Fantasy")}>
          <i className="fa-solid fa-dragon" />
          <p>Fantasy</p>
        </div>
        <div className="side-link" onClick={() => addFilter("Romance")}>
          <i className="fa-solid fa-heart" />
          <p>Romance</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
