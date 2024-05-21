import "./Filters.css";

type Props = {
  filters: string[];
  resetFilters: () => void;
};

const Filters = (props: Props) => {
  const removeFilters = (filter: string) => {
    for (let i = 0; i < filter.length; i++) {
      if (filter === props.filters[i]) {
        delete props.filters[i];
      }
    }
    props.resetFilters();
  };

  return (
    <div className="filters-nav">
      {props.filters?.map((item: string) => (
        <button className="filter" onClick={() => removeFilters(item)}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default Filters;
