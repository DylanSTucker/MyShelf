import "./Filters.css";

type Props = {
  filters: Set<string>;
  removeFilters: (filter: string) => void;
};

const Filters = (props: Props) => {
  const filtersArray = Array.from(props.filters);
  return (
    <div className="filters-nav">
      {filtersArray?.map((item: string) => (
        <button className="filter" onClick={() => props.removeFilters(item)}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default Filters;
