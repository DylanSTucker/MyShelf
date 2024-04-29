import "./Feed.css";
import Card from "../Card/Card";

interface Props {
  bookData: Object[];
}

const Feed = (props: Props) => {
  return <div className="feed">{<Card bookData={props.bookData} />}</div>;
};

export default Feed;
