import "./Navbar.css";

type Props = {
  search: string;
  setSearch: (search: string) => void;
  searchBook: (evt: { key: string }) => void;
};

const Navbar = (props: Props) => {
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <div className="menu-icon">
          <i className="fa-solid fa-bars fa-xl" />
        </div>
        <div className="logo">
          <i className="fa-solid fa-book-open-reader fa-2xl" />
        </div>
      </div>
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder="search"
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
            onKeyDown={props.searchBook}
          />
          <i className="fa-solid fa-magnifying-glass" />
        </div>
      </div>
      <div className="nav-right flex-div">
        <i className="fa-solid fa-moon fa-xl" />
        <i className="fa-solid fa-gear fa-xl" />
        <div className="user-icon">
          <i className="fa-solid fa-user fa-xl" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
