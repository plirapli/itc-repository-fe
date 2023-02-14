import React, { useEffect, useState } from 'react';
import Tags from '../tags/Tags';
import { Icon } from '@iconify/react';

const MateriCard = ({ data, ...props }) => {
  const [materi, setMateri] = useState({});

  useEffect(() => {
    if (data) {
      setMateri({
        title: data.title,
        id_divisi: data.id_division,
        img: data.image_thumbnail,
        createdAt: data.createdAt || '14/09/2021',
        updatedAt: data.updatedAt || '15/10/2022',
        author: data.user,
      });
    }
  }, []);

  return (
    <div className='bg-white shadow rounded-lg p-3 h-full'>
      <div
        className='w-full h-40 max-h-80 bg-zinc-300 bg-cover rounded'
        style={{ backgroundImage: `url(${materi.img})` }}
      ></div>
      <div className='mt-1'>
        {/* Tags */}
        <div className='mt-2'>
          <Tags id={materi.id_divisi} divisi={props.divisi} />
        </div>

        {/* Title */}
        <p className='w-full mt-1 text-sm clamp'>{materi?.title}</p>

        {/* Author */}
        <div className='mt-1 flex items-center gap-1 text-gray-dark'>
          <Icon icon='carbon:user-avatar-filled' width='16' />
          <span className='text-sm'>{materi?.author}</span>
        </div>

        {/* Date */}
        <div className='mt-1 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2'>
          <div className='flex items-center gap-1 text-gray-dark'>
            <Icon icon='ic:round-date-range' width='16' />
            <span className='text-xs'>{materi?.createdAt}</span>
          </div>
          <span className='hidden sm:inline'>|</span>
          <div className='flex items-center gap-1 text-gray-dark pl-0.5 sm:pl-0'>
            <Icon
              className='mt-0.5'
              icon='fluent-mdl2:date-time-12'
              width='14'
            />
            <span className='text-xs'>{materi?.updatedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MateriCard;
