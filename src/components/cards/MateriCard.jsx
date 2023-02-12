import React, { Fragment, useEffect, useState } from 'react';
import Tags from '../tags/Tags';
import { Icon } from '@iconify/react';
import { Menu, Transition } from '@headlessui/react';

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
        <div className='flex items-center justify-between gap-1'>
          <Tags id={materi.id_divisi} divisi={props.divisi} />

          {/* Overlay Menu */}
          {props.isAdmin && (
            <Menu as='div' className='relative mt-1'>
              <Menu.Button>
                <Icon icon='bx:dots-vertical-rounded' width='20' />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='min-w-[8rem] absolute right-0 rounded shadow overflow-hidden transform translate-y-full bottom-0 border'>
                  <Menu.Item>
                    <div className='bg-white py-1'>
                      <div className='px-3 py-1.5 overlay-text'>
                        Atur Materi
                      </div>

                      {/* Pembatas */}
                      <div className='px-3 py-1'>
                        <div className='w-full h-[1px] bg-gray-light'></div>
                      </div>
                      {/* End Pembatas */}

                      <div className='px-3 py-1.5 overlay-text text-danger-main'>
                        Hapus
                      </div>
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>

        {/* Title */}
        <p className='w-full -mt-1 text-sm clamp'>{materi?.title}</p>

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
