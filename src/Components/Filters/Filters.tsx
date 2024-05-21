import "./Filters.css";

type Props = {
  filters: string[];
};

const Filters = (props: Props) => {
  const arr = ["Read", "Fantasy", "Sci-Fi"];

  return (
    <div className="filters-nav">
      {arr?.map((item: string) => (
        <button className="filter">{item}</button>
      ))}
    </div>
  );
};

export default Filters;
