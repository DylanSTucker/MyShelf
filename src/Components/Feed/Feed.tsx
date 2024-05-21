import "./Feed.css";
import Card from "../Card/Card";

interface Props {
  bookData: Object[];
  search: string;
  searchUpdate: boolean;
  setSearchUpdate: (searchUpdate: boolean) => void;
}
let query = "";
const Feed = (props: Props) => {
  console.log(props.searchUpdate);
  if (props.searchUpdate) {
    query = props.search;
    props.setSearchUpdate(false);
  }
  return (
    <div>
      {query && (
        <div className="query">
          <h2>Search results for "{query}"</h2>
        </div>
      )}
      <div className="feed">{<Card bookData={props.bookData} />}</div>
    </div>
  );
};

export default Feed;
