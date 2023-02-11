import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { getAllUser } from '../../Utils/user';

// Components
import { ListUserCard } from '../../components/cards';
import SearchBar from '../../components/inputForm/SearchBar';

const ListUserPage = ({ divisi, ...props }) => {
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);

  const getAllUserHandler = () => {
    getAllUser()
      .then((users) => {
        setVerifiedUsers(users.filter(({ verify }) => verify));
        setUnverifiedUsers(users.filter(({ verify }) => !verify));
      })
      .catch(({ data }) => console.log(data.message));
  };

  useEffect(() => {
    getAllUserHandler();
  }, []);

  return (
    <>
      <div className='flex flex-col gap-2 sm:flex-row sm:items-center justify-between'>
        <h1 className='text-2xl'>Daftar Pengguna</h1>
      </div>

      {/* Sort, Filter, Search */}
      <div className='mt-2 sm:mt-3'>
        <SearchBar placeholder='Cari pengguna' />
      </div>

      {/* Main */}
      <main className='mt-3 sm:mt-4'>
        {/* Verified Section */}
        <ListUserContainer title='Terverifikasi'>
          {verifiedUsers?.map((user) => (
            <ListUserCard key={user.id} user={user} />
          ))}
        </ListUserContainer>

        {/* Unverified Section */}
        <ListUserContainer title='Belum Terverifikasi'>
          {unverifiedUsers?.map((user) => (
            <ListUserCard key={user.id} user={user} />
          ))}
        </ListUserContainer>
      </main>
    </>
  );
};

const ListUserContainer = ({ title, children }) => {
  return (
    <>
      <section className='mt-3 bg-white rounded-md overflow-hidden'>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between items-center px-4 py-2 bg-white font-medium hover:bg-black hover:bg-opacity-5 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75'>
                <h3 className='min-w-max font-medium'>{title}</h3>
                <Icon
                  icon='eva:arrow-ios-downward-fill'
                  className={`transition-all ${
                    open ? 'rotate-180 transform' : ''
                  }`}
                  width='20'
                />
              </Disclosure.Button>
              <Disclosure.Panel className='bg-white'>
                {children}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </section>
    </>
  );
};

export default ListUserPage;
