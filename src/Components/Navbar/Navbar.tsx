import "./Navbar.css";
import {searchBooks} from "../../scripts/googleBooks";


type Props = {
  search: string;
  setSearch: (search: string) => void;
  searchUpdate: boolean;
  setSearchUpdate: (searchUpdate: boolean) => void;
  setAllBookData: (item: []) => void;
  sidebar: boolean;
  setSidebar: (sidebar: boolean) => void;
  shelf: boolean;
  setShelf: (shelf: boolean) => void;
};

const Navbar = (props: Props) => {

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    props.setShelf(false);
    props.setSearchUpdate(true);

    //search google books api
    searchBooks(props.search, props.setAllBookData, 40);
  };
  return (
    <nav className="shelf-navbar">
      <div className="nav-left flex-div">
        <div className="menu-icon">
          <i
            className="fa-solid fa-bars fa-xl"
            onClick={() =>
              props.setSidebar(props.sidebar === false ? true : false)
            }
          />
        </div>
      </div>
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <form onSubmit={handleSubmit}>
            {/*<input
              type="text"
              placeholder="search"
              value={props.search}
              onChange={(e) => props.setSearch(e.target.value)}
              onKeyDown={props.searchBook}
            />*/}
            <input
              type="text"
              placeholder="search"
              value={props.search}
              onChange={(e) => props.setSearch(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass" />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
