import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Ava } from '../../assets';
import Button from '../buttons/Button';
import OverlayNavbar from '../overlay/OverlayNavbar';

const NavbarBack = ({ user, setIsAuthed }) => {
  const navigate = useNavigate();
  const { fullName, divisionName, photoProfile } = user;
  const toBack = () => navigate(-1);

  return (
    <nav className='w-full bg-primary flex items-center justify-between pl-1 sm:pl-6 relative'>
      <Button
        onClick={toBack}
        variant='icon-left'
        size='small'
        color='transparent'
        icon='eva:arrow-back-fill'
        isResponsive
      >
        Kembali
      </Button>

      <Menu as='div' className='relative inline-block text-left '>
        <div>
          <Menu.Button className='flex gap-2.5 sm:gap-4 items-center px-4 py-2 sm:pr-5 sm:py-2.5 hover:bg-black hover:bg-opacity-20 focus:outline-none '>
            {/* User info */}
            <div className='text-right max-w-[10rem]'>
              <p className='text-xs sm:text-sm font-medium text-white truncate'>
                {fullName || 'Loading...'}
              </p>
              <p className='hidden sm:block text-xs text-accent'>
                {divisionName || 'Loading...'}
              </p>
            </div>

            {/* Profile img */}
            <img
              className='w-8 h-8 sm:w-9 sm:h-9 border-2 rounded bg-cover overflow-hidden'
              loading='lazy'
              src={photoProfile || Ava}
              alt='Profile'
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 origin-top-right'>
            <OverlayNavbar user={user} setIsAuthed={setIsAuthed} />
          </Menu.Items>
        </Transition>
      </Menu>
    </nav>
  );
};

export default NavbarBack;
