import "./Filters.css";

type Props = {
  filters: string[];
  removeFilters: (filter: string) => void;
};

const Filters = (props: Props) => {
  return (
    <div className="filters-nav">
      {props.filters?.map((item: string) => (
        <button className="filter" onClick={() => props.removeFilters(item)}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default Filters;
