import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [navbar, setNavbar] = useState();
  const setNavbarHandler = (component) => setNavbar(() => component);

  return (
    <div className='w-full flex flex-col justify-center sm:items-center'>
      {navbar}

      <div className='w-full max-w-screen-xl min-h-screen sm:px-6'>
        <Outlet context={setNavbarHandler} />
      </div>

      {/* Footer */}
    </div>
  );
};

export default Layout;
