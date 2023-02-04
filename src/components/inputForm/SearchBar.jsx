const SearchBar = (props) => {
  const style = '';

  return (
    <input
      type='text'
      onChange={props.search}
      value={props.input}
      className={`search-bar block w-full rounded-md border-gray-300 shadow-sm focus-primary sm:text-sm ${style}`}
      placeholder='Cari materi'
    />
  );
};

export default SearchBar;
