import React from 'react';
import { Icon } from '@iconify/react';

const SearchBar = (props) => {
  return (
    <div className='w-full flex items-center justify-between px-4 py-2.5 rounded-md bg-white'>
      <input
        type='text'
        onChange={props.search}
        value={props.input}
        className='w-full outline-none bg-white bg-opacity-0'
        placeholder='Cari materi'
      />
      <Icon icon='akar-icons:search' width='20' />
    </div>
  );
};

export default SearchBar;
