const SearchBar = ({ onChange, ...props }) => {
  return (
    <input
      type='text'
      onChange={onChange}
      value={props.value}
      className='search-bar block w-full rounded-md border-gray-300 shadow-sm focus-primary sm:text-sm'
      placeholder={props.placeholder || 'Cari'}
    />
  );
};

export default SearchBar;
