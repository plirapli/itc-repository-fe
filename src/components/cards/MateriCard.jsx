import React from 'react';
import Tags from '../tags/Tags';
import { Icon } from '@iconify/react';

const MateriCard = (props) => {
  return (
    <div className='bg-white shadow-md rounded-lg p-3 sm:p-4'>
      <div className='w-full h-36 max-h-80 bg-zinc-300 bg-cover rounded'></div>
      <div className='flex flex-col gap-2 mt-3'>
        <div className='flex items-center justify-between gap-2'>
          <Tags id={props.id} />
          <Icon icon='bx:dots-vertical-rounded' width='20' />
        </div>

        <div className='flex items-center gap-1.5 text-gray-dark'>
          <Icon icon='carbon:user-avatar-filled' width='20' />
          <span className='text-sm'>{props.author || 'Muhammad Rafli'}</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1.5 text-gray-dark'>
            <Icon icon='ic:round-date-range' width='20' />
            <span className='text-sm'>{props.createAt || '14/09/2021'}</span>
          </div>
          |
          <div className='flex items-center gap-1.5 text-gray-dark'>
            <Icon icon='fluent-mdl2:date-time-12' width='18' />
            <span className='text-sm'>{props.updateAt || '15/10/2022'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MateriCard;
