import { Fragment } from 'react';
import { Transition } from '@headlessui/react';

const ModalForm = ({ show, title, children }) => {
  return (
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
                  {title}
                </h3>

                {/* Body */}
                <div className='mt-2'>{children}</div>
              </div>
              {/* End Main Container */}
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default ModalForm;
