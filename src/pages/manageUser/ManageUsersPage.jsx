import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllUsers,
  changeUserRole,
  changeUserVerify,
  deleteUser,
} from '../../utils/user';
import { logoutHandler } from '../../utils/auth';
import { useProfile, useTitle } from '../../hooks';

// Components
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { SearchBar } from '../../components/forms';
import {
  ManageUserVerifiedCard,
  ManageUserNotVerifiedCard,
} from '../../components/cards';
import OverlayLoading from '../../components/overlay/OverlayLoading';

const ManageUsersPage = () => {
  const navigate = useNavigate();
  const { profile, setProfile } = useProfile();
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useTitle('Daftar Pengguna');

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
        if (profile.id === id) {
          logoutHandler();
          setProfile({});
          navigate('/');
        }
        getAllUserHandler();
      })
      .catch(({ data }) => console.log(data.message));
  };

  const setVerifyHandler = (id) => {
    setIsLoading(true);
    changeUserVerify(id, true)
      .then(() => getAllUserHandler())
      .catch(({ data }) => {
        console.log(data.message);
        setIsLoading(false);
      });
  };

  const deleteUserHandler = (id) => {
    setIsLoading(true);
    deleteUser(id)
      .then(() => getAllUserHandler())
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
              rejectUser={deleteUserHandler}
            />
          ))}
        </ListUserContainer>
      </main>

      <OverlayLoading loadingState={isLoading} />
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
                  className={`-mr-1 w-5 text-gray-dark transition-all ${
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
