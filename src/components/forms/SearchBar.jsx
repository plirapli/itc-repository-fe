const SearchBar = (props) => (
  <input
    type='text'
    className='search-bar block w-full rounded-md border-gray-300 shadow-sm focus-primary sm:text-sm'
    {...props}
  />
);

export default SearchBar;
