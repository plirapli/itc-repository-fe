import React from 'react';
import { Icon } from '@iconify/react';

const SelectOption = ({ options, ...props }) => {
  options = [
    { id: 1, name: 'A-Z' },
    { id: 2, name: 'Z-A' },
    { id: 3, name: 'Lorem ipsum' },
  ];

  return (
    <div className='w-full sm:w-fit flex flex-col sm:flex-row gap-1 sm:gap-3 sm:items-center'>
      <label htmlFor={props || ''} className='font-medium text-primary'>
        {props.label || 'Label'}
      </label>
      <div className='flex items-center relative text-white'>
        <select
          name='prov'
          id={props.for || ''}
          className='
            w-full px-4 py-2.5 pr-8 sm:px-4 sm:py-2.5 sm:pr-10
            bg-primary rounded-md shadow
            focus:outline-none appearance-none overflow-ellipsis
          '
          onChange={(e) => {
            props.inputHandler(e);
          }}
        >
          {options.map((data) => (
            <option
              data-data={data.id}
              key={data.id}
              value={data.name}
              className='bg-white text-primary'
            >
              {data.name}
            </option>
          ))}
        </select>
        <Icon
          className='absolute right-2'
          icon='eva:chevron-down-fill'
          width='20'
        />
      </div>
    </div>
  );
};

export default SelectOption;
