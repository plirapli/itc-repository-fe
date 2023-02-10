import React from 'react';
import Button from '../buttons/Button';
import { Select } from '../inputForm/SelectOption';

const ListUserCard = () => {
  return (
    <div className='px-4 pt-3.5'>
      <div className='grid grid-cols-6 gap-2.5 sm:flex sm:gap-2 items-center'>
        <div className='col-span-5 sm:w-full text-sm'>
          <p>Muhammad Rafli</p>
          <span className='text-gray-dark'>johndoe@gmail.com</span>
        </div>
        <div className='col-span-6 order-3 sm:order-2 flex gap-2'>
          <div className='w-full sm:w-32'>
            <Select color='secondary'>
              <option className='bg-white' value='1'>
                User
              </option>
              <option className='bg-white' value='2'>
                Admin
              </option>
            </Select>
          </div>
          <div className='w-full sm:w-48'>
            <Select color='secondary'>
              <option className='bg-white' value='1'>
                Terverifikasi
              </option>
              <option className='bg-white' value='0'>
                Belum Terverifikasi
              </option>
            </Select>
          </div>
        </div>
        <div className='justify-self-end order-2 sm:order-last'>
          <Button variant='icon-only' color='danger' icon='bxs:trash' />
        </div>
      </div>

      {/* Pembatas */}
      <div className='mt-3.5 w-full h-[1px] bg-gray-light'></div>
    </div>
  );
};

export default ListUserCard;
