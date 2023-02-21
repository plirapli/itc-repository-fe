import Button from '../buttons/Button';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import { Ava } from '../../assets';
import { Fragment } from 'react';

const DiscussionCard = ({
  discussion,
  onClickEdit,
  onClickDelete,
  ...props
}) => {
  return (
    <div className='bg-white px-3.5 py-3 pr-2 rounded-lg shadow'>
      {/* Header Card */}
      <div className='flex items-center gap-2'>
        <img
          className='bg-slate-400 max-w-[2rem] h-8 rounded-full overflow-hidden'
          loading='lazy'
          src={discussion.User.photoProfile || Ava}
          alt='profil'
        />
        <div className='w-full flex flex-col'>
          <p className='text-sm truncate'>{discussion.fullName}</p>
          <div className='text-xs text-gray-dark'>{discussion.createdAt}</div>
        </div>

        {/* 3 Dots menu */}
        <Menu as='div' className='self-start relative inline-block text-left'>
          <div>
            <Menu.Button className='p-1 pt-0'>
              <EllipsisVerticalIcon className='-mr-2 w-4 text-gray-dark' />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='z-10 absolute right-0 mt-1 p-1.5 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onClickEdit}
                    className={`w-full px-4 py-1.5 rounded text-sm ${
                      active && 'bg-gray-light'
                    }`}
                  >
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onClickDelete}
                    className={`w-full px-4 py-1.5 rounded text-sm text-danger-main ${
                      active && 'bg-danger-main bg-opacity-10'
                    }`}
                  >
                    Hapus
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {/* Isi Card */}
      <main className='mt-1.5'>
        <div>{discussion.title}</div>
        <p className='text-gray-dark text-sm clamp'>{discussion.body}</p>
      </main>

      {/* Reply Button */}
      {props.isReply && (
        <div className='mt-3'>
          <Button
            onClick={props.onClick}
            variant='icon-left'
            color='secondary'
            icon='ic:baseline-reply'
            size='small'
          >
            Balas
          </Button>
        </div>
      )}
    </div>
  );
};

export default DiscussionCard;
