import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

const OverlayLoading = ({ loadingState }) => {
  return (
    <Transition appear show={loadingState} as={Fragment}>
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
              <div className='w-60 -mt-32 transform overflow-hidden rounded-xl bg-white px-6 py-12 text-left align-middle shadow-xl transition-all'>
                <div className='flex justify-center'>
                  <EllipsisHorizontalIcon className='w-16' />
                </div>
                <p className='text-center'>Memproses data</p>
              </div>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default OverlayLoading;
