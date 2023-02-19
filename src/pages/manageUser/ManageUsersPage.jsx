import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import {
  getAllUsers,
  changeUserRole,
  changeUserVerify,
} from '../../utils/user';
import { getLocalAccessToken, logoutHandler } from '../../utils/auth';

// Components
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import {
  ManageUserVerifiedCard,
  ManageUserNotVerifiedCard,
} from '../../components/cards';
import { SearchBar } from '../../components/forms';
import { Icon } from '@iconify/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const ManageUsersPage = ({ setIsAuthed }) => {
  const navigate = useNavigate();
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllUserHandler = () => {
    getAllUsers()
      .then((users) => {
        setVerifiedUsers(users.filter(({ verify }) => verify));
        setUnverifiedUsers(users.filter(({ verify }) => !verify));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const onChangeRoleHandler = (value, id) => {
    setIsLoading(true); // Show loading screen

    changeUserRole(id, value)
      .then(() => {
        // Check kalo yang diubah diri sendiri
        const { id: userID } = jwt(getLocalAccessToken());
        if (userID === id) {
          logoutHandler();
          setIsAuthed(false);
          navigate('/login');
        }
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => getAllUserHandler());
  };

  const setVerifyHandler = (id) => {
    setIsLoading(true);
    changeUserVerify(id, true)
      .then(() => {
        // Check kalo yang diubah diri sendiri
        const { id: userID } = jwt(getLocalAccessToken());
        if (userID === id) {
          logoutHandler();
          setIsAuthed(false);
          navigate('/login');
        }
        // Get all user after update
        getAllUserHandler();
      })
      .catch(({ data }) => {
        console.log(data.message);
        setIsLoading(false);
      });
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
            <ManageUserVerifiedCard
              key={user.id}
              user={user}
              setRole={onChangeRoleHandler}
            />
          ))}
        </ListUserContainer>

        {/* Unverified Section */}
        <ListUserContainer title='Belum Terverifikasi'>
          {unverifiedUsers?.map((user) => (
            <ManageUserNotVerifiedCard
              key={user.id}
              user={user}
              acceptUser={setVerifyHandler}
            />
          ))}
        </ListUserContainer>
      </main>

      <Transition
        appear
        show={isLoading}
        as={Fragment}
        onClose={() => setIsLoading(true)}
      >
        <Dialog as='div' className='relative z-10'>
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
                <Dialog.Panel className='w-full max-w-xs -mt-32 transform overflow-hidden rounded-2xl bg-white px-6 py-12 text-left align-middle shadow-xl transition-all'>
                  <div className='mt-2 flex justify-center'>
                    <Icon width={64} icon='line-md:loading-twotone-loop' />
                  </div>

                  <div className='mt-4'>
                    <p className='text-center'>Memproses data</p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
              <Disclosure.Button className='flex w-full justify-between items-center px-4 py-2 border-b bg-white hover:bg-black hover:bg-opacity-5 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75'>
                <h3 className='min-w-max'>{title}</h3>
                <ChevronDownIcon
                  className={`-mr-1 h-5 w-5 text-gray-dark transition-all ${
                    open && 'rotate-180'
                  }`}
                  aria-hidden='true'
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

export default ManageUsersPage;
