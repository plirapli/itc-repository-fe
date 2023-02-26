import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import ButtonMin from '../buttons/ButtonMin';

const ModalDelete = ({ show, onClose, onClickDelete, children, ...props }) => {
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <div className='relative z-10'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                {/* Main Container */}
                <div className='w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <h3 className='text-lg font-medium leading-6 text-gray-900'>
                    {props.title}
                  </h3>

                  {/* Body */}
                  <div className='mt-3'>{children}</div>

                  <div className='mt-4 flex gap-2'>
                    <ButtonMin onClick={onClose} color='gray' size='small'>
                      Tutup
                    </ButtonMin>
                    <ButtonMin
                      onClick={onClickDelete}
                      color='danger'
                      size='small'
                    >
                      Hapus
                    </ButtonMin>
                  </div>
                </div>
                {/* End Main Container */}
              </Transition.Child>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default ModalDelete;
