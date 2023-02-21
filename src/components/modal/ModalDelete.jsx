import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from '../buttons/Button';

const ModalDelete = ({ show, onClose, onClickDelete, children, ...props }) => {
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={onClose}>
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
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    {props.title}
                  </Dialog.Title>

                  {/* Body */}
                  <div className='mt-3'>{children}</div>

                  <div className='mt-4 flex gap-2'>
                    <Button onClick={onClose} color='gray' size='small'>
                      Tutup
                    </Button>
                    <Button onClick={onClickDelete} color='danger' size='small'>
                      Hapus
                    </Button>
                  </div>
                </Dialog.Panel>
                {/* End Main Container */}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalDelete;
