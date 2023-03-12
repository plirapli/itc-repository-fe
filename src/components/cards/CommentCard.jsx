import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Ava } from '../../assets';
import { useProfile } from '../../hooks';

const CommentCard = ({ comment, onClickEdit, onClickDelete }) => {
  const { profile } = useProfile();

  return (
    <>
      <div className='bg-white flex gap-2.5 p-2.5 pr-1 rounded-lg shadow'>
        <img
          className='bg-slate-400 max-w-[2rem] h-8 rounded-full overflow-hidden'
          loading='lazy'
          src={comment?.User?.photoProfile || Ava}
          alt='profile'
        />
        <div className='-my-0.5 w-full'>
          <div className='flex'>
            <div className='w-full font-medium text-sm'>
              {comment?.fullName}
              <div className='flex gap-1 text-xs text-gray-dark'>
                {comment?.updatedAt}
                {comment?.isEdited && <span>(edited)</span>}
              </div>
            </div>

            {profile?.id === comment?.id_user && (
              <Menu as='div' className='relative inline-block text-left'>
                <div>
                  <Menu.Button>
                    <EllipsisVerticalIcon className='w-4 text-gray-dark' />
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
                          onClick={(e) =>
                            onClickEdit(e, {
                              id: comment?.id,
                              body: comment?.body,
                            })
                          }
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
                          onClick={(e) => onClickDelete(e, { id: comment?.id })}
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
            )}
          </div>
          <p className='mt-1 text-sm'>{comment?.body}</p>
        </div>
      </div>
    </>
  );
};

export default CommentCard;
