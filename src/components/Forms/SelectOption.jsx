import React from 'react';
import { Icon } from '@iconify/react';

const SelectOption = ({ options, ...props }) => {
  options = options || ['A-Z', 'Z-A', 'Lorem ipsum'];

  return (
    <div className={`w-full sm:w-fit flex flex-col gap-1 ${props.style || ''}`}>
      <label htmlFor={''} className='font-medium text-black'>
        {props.label || 'Label'}
      </label>
      <div className='flex items-center relative text-white'>
        <select
          id={props.for || ''}
          className='
            w-full px-4 py-2.5 sm:pr-8
            bg-primary rounded-md shadow
            focus:outline-none appearance-none overflow-ellipsis
          '
          value={props.value}
          onChange={(e) => {
            props.handler(e, props.name);
          }}
        >
          {options.map((data) => (
            <option
              key={data.id}
              value={data.id}
              className='bg-white text-primary'
            >
              {data.divisionName}{' '}
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
