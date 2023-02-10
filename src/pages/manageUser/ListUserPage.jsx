import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { ListUserCard } from '../../components/cards';
import SearchBar from '../../components/inputForm/SearchBar';
import { Select } from '../../components/inputForm/SelectOption';

const ListUserPage = ({ divisi, ...props }) => {
  const [selectedDivisi, setSelectedDivisi] = useState('0');
  const filterSelectHandler = (e) => setSelectedDivisi(e.target.value);

  return (
    <>
      <div className='flex flex-col gap-2 sm:flex-row sm:items-center justify-between'>
        <h1 className='text-2xl'>Daftar Pengguna</h1>
      </div>

      {/* Sort, Filter, Search */}
      <div className='mt-2 sm:mt-3 grid grid-cols-12  gap-3 sm:gap-4'>
        <div className='col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2'>
          <Select
            color='secondary'
            label='Divisi'
            value={selectedDivisi}
            onChange={filterSelectHandler}
          >
            <option value='0'>Semua</option>
            {divisi.map(({ id, divisionName }) => (
              <option className='bg-white' key={id} value={id}>
                {divisionName}
              </option>
            ))}
          </Select>
        </div>
        <div className='col-span-12 sm:col-span-6 lg:col-span-4 lg:col-start-9'>
          <SearchBar placeholder='Cari pengguna' />
        </div>
      </div>

      {/* Main */}
      <main className='mt-3 sm:mt-4'>
        {/* Verified Section */}
        <section>
          <div className='flex items-center gap-2'>
            <h3 className='min-w-max font-medium'>Terverifikasi</h3>
            <div className='w-full h-[1px] bg-[#D6D6D6]'></div>
            <div className='bg-[#D6D6D6] rounded-full'>
              <Icon icon='eva:arrow-ios-upward-fill' width='20' />
            </div>
          </div>

          {/* Container */}
          <div className='mt-2 bg-white rounded-md'>
            <ListUserCard />
            <ListUserCard />
            <ListUserCard />
            <ListUserCard />
          </div>
        </section>
        {/* Verified Section */}
        <section className='mt-4'>
          <div className='flex items-center gap-2'>
            <h3 className='min-w-max font-medium'>Belum Terverifikasi</h3>
            <div className='w-full h-[1px] bg-[#D6D6D6]'></div>
            <div className='bg-[#D6D6D6] rounded-full'>
              <Icon icon='eva:arrow-ios-upward-fill' width='20' />
            </div>
          </div>

          {/* Container */}
          <div className='mt-2 bg-white rounded-md'>
            <ListUserCard />
            <ListUserCard />
            <ListUserCard />
            <ListUserCard />
          </div>
        </section>
      </main>
    </>
  );
};

export default ListUserPage;
