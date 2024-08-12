import "./Navbar.css";
import { useCookies } from "react-cookie";


type Props = {
  search: string;
  setSearch: (search: string) => void;
  searchUpdate: boolean;
  setSearchUpdate: (searchUpdate: boolean) => void;
  searchBook: (evt: { key: string }) => void;
  sidebar: boolean;
  setSidebar: (sidebar: boolean) => void;
  shelf: boolean;
  setShelf: (shelf: boolean) => void;
};

const Navbar = (props: Props) => {
  const [cookies] = useCookies(undefined);


  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    props.setShelf(false);
    props.setSearchUpdate(true);
    //props.searchUpdate = true;
    console.log(props.searchUpdate, "search");
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
              onKeyDown={props.searchBook}
            />
            <i className="fa-solid fa-magnifying-glass" />
          </form>
        </div>
      </div>
      {!cookies.authToken &&
          <div className="login-buttons">
            <button className="sign-up">Sign Up</button>
            <button className="login">Login</button>
          </div>
        }
    </nav>
  );
};

export default Navbar;
