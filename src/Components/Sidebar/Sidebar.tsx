import "./Sidebar.css";
import { useCookies } from "react-cookie";

type Props = {
  sidebar: boolean;
  shelf: boolean;
  setShelf: (shelf: boolean) => void;
  filters: Set<string>;
  resetFilters: () => void;
  setStats: (stats: boolean) => void;
};

const Sidebar = (props: Props) => {
  const [cookies, setCookies, removeCookie] = useCookies();

  
  const signOut = () => {
    console.log(cookies.email);
    setCookies("Email", cookies.Email);
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };
  
  const addFilter = (filter: string) => {
    //return if this is a duplicate
    if (filter in props.filters) {
      return;
    }
    //add to filters array if it is not a duplicate
    props.filters.add(filter);
    props.resetFilters();
  };
  const handleSetShelf = () =>{
    props.setShelf(true);
    props.setStats(false);

    //this should get removed and ensure that search feed is disabled when stats is enabled
    window.location.reload();

  }
  const handleSetStats = () =>{
    props.setStats(true);
    props.setShelf(false);
  }

  return (
    <div className={`sidebar ${props.sidebar ? "" : "small-sidebar"}`}>
      <div className="shortcut-links">
        <div className="side-link" onClick={() => signOut()}>
          <i className="fa-solid fa-user" />
          <p>Profile</p>
        </div>
        <div
          className="side-link"
          onClick={() => handleSetShelf()}
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
          <p>To Be Read</p>
        </div>
        <div className="side-link" onClick={() => handleSetStats()}>
          <i className="fa-solid fa-chart-simple" />
          <p>Stats</p>
        </div>
      </div>
      <hr />
      <div className="genre-list">
        <div className="side-link" onClick={() => addFilter("History")}>
          <i className="fa-solid fa-landmark" />
          <p>History</p>
        </div>
        <div className="side-link" onClick={() => addFilter("Fiction")}>
          <i className="fa-solid fa-dragon" />
          <p>Fiction</p>
        </div>
        <div className="side-link" onClick={() => addFilter("Science Fiction")}>
          <i className="fa-solid fa-atom" />
          <p>Science Fiction</p>
        </div>
        <div className="side-link" onClick={() => addFilter("Fantasy")}>
          <i className="fa-solid fa-hat-wizard" />
          <p>Fantasy</p>
        </div>
        <div className="side-link" onClick={() => addFilter("Horror")}>
          <i className="fa-solid fa-ghost"></i>
          <p>Horror</p>
        </div>
        <div className="side-link" onClick={() => addFilter("Philosophy")}>
          <i className="fa-solid fa-brain"></i>
          <p>Philosophy</p>
        </div>
        <div className="side-link" onClick={() => addFilter("Humorous")}>
          <i className="fa-solid fa-face-grin-squint-tears"></i>
          <p>Humorous</p>
        </div>
        <div className="side-link" onClick={() => addFilter("Classics")}>
          <i className="fa-solid fa-landmark"></i>
          <p>Classics</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
