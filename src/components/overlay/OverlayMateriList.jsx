import React, { useState } from 'react';
import { Disclosure, Listbox, Transition } from '@headlessui/react';
import Button from '../buttons/Button';
import { Icon } from '@iconify/react';

const OverlayMateriList = ({ setIsClicked }) => {
  const people = [
    { id: 1, name: 'Durward Reynolds', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: true },
    { id: 5, name: 'Katelyn Rohan', unavailable: false },
  ];

  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <div className='w-full sm:w-[25rem] absolute top-0 right-0 px-6 py-5 min-h-screen bg-white flex flex-col gap-4'>
      {/* Header */}
      <div className='flex items-center gap-2'>
        <div className='w-full'>
          <h1 className='text-xl'>Daftar Materi</h1>
          <p className='text-sm'>[Judul Materi]</p>
        </div>
        <Button
          onClick={setIsClicked}
          variant='icon-only'
          icon='eva:close-fill'
          color='secondary'
        />
      </div>

      {/* Chapter & Article Card */}
      <div className='bg-secondary rounded-md overflow-hidden'>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between items-center bg-secondary px-4 py-3 text-left text-sm font-medium hover:bg-secondaryHover     focus:outline-none focus-visible:ring focus-visible:ring-primary  focus-visible:ring-opacity-75'>
                <div className='w-full flex flex-col items-start gap-1'>
                  <p className='w-full font-medium text-sm'>[Judul Bab]</p>
                  <div className='px-1 bg-primary text-white text-xs rounded'>
                    8 Artikel
                  </div>
                </div>
                <Icon
                  icon='akar-icons:chevron-down'
                  className={`transition-all ${open && 'rotate-180'}`}
                  width='14'
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
              >
                <Disclosure.Panel>
                  <div className='px-4 py-3 bg-secondary truncate'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptas exercitationem, ratione est numquam autem, sequi
                    aperiam dignissimos, corporis deleniti iure omnis minus
                    nesciunt temporibus. Magni debitis quod voluptas quas
                    voluptatem.
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default OverlayMateriList;
