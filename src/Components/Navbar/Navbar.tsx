import "./Navbar.css";

type Props = {
  search: string;
  setSearch: (search: string) => void;
  searchBook: (evt: { key: string }) => void;
  sidebar: boolean;
  setSidebar: (sidebar: boolean) => void;
  shelf: boolean;
  setShelf: (shelf: boolean) => void;
};

const Navbar = (props: Props) => {
  const handleChange = (e: { target: { value: string } }) => {
    props.setSearch(e.target.value);
    props.setShelf(false);
    console.log(props.shelf);
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    props.setShelf(false);
    console.log(props.shelf);
  };

  return (
    <nav className="flex-div">
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
            <input
              type="text"
              placeholder="search"
              value={props.search}
              onChange={(e) => props.setSearch(e.target.value)}
              onKeyDown={props.searchBook}
            />
            <i className="fa-solid fa-magnifying-glass" />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
