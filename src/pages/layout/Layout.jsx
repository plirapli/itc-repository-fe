import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';

const Layout = () => {
  const [navbar, setNavbar] = useState();
  const setNavbarHandler = (component) => setNavbar(component);

  return (
    <div className='w-full flex flex-col min-h-screen'>
      {navbar}

      <div className='w-full flex-1 sm:px-6 flex justify-center'>
        <div className='w-full max-w-screen-xl'>
          <Outlet context={setNavbarHandler} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
