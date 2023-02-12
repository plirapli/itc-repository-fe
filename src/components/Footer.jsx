import { Icon } from '@iconify/react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='w-full bg-primary flex flex-col items-center'>
      <div className='w-full max-w-screen-xl px-5 sm:px-6'>
        {/* Upper Layer */}
        <div className='py-2.5 flex flex-col md:flex-row gap-2 md:gap-4 sm:justify-between md:items-center'>
          {/* Logo & Tulisan ITC */}
          <div>
            <div className='w-max text-accent font-bold'>
              Information Technology Club
            </div>
            <div className='w-max text-white font-medium text-sm'>
              UPN "Veteran" Yogyakarta
            </div>
          </div>

          <div className='flex gap-4'>
            {/* Lokasi */}
            <div className='text-white flex flex-col gap-1 w-100'>
              <div className='font-bold text-sm'>Lokasi</div>
              <hr />
              <div className='text-xs sm:text-sm'>
                Jl. Tambak Bayan No. 22, Janti, Caturtunggal, Kec. Depok, Kab.
                Sleman, Daerah Istimewa Yogyakarta 55281
              </div>
            </div>

            {/* Kontak */}
            <div className='text-white flex flex-col gap-1 w-100 md:w-auto'>
              <div className='w-max font-bold text-sm'>Kontak Kami</div>
              <hr />
              <div className='flex gap-1'>
                <a
                  target='_blank'
                  href='https://instagram.com/itcupnyk'
                  rel='noreferrer'
                >
                  <div className='w-6 sm:w-7 transition-all hover:text-accent'>
                    <Icon icon='mdi:instagram' width='100%' />
                  </div>
                </a>
                <div className='w-6 sm:w-7 transition-all hover:text-accent'>
                  <Icon icon='ic:baseline-whatsapp' width='100%' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Layer */}
      <div className='w-full px-4 bg-black bg-opacity-20'>
        <div className='py-2.5 text-xs sm:text-sm text-center text-accent'>
          &copy; {year} Developed by ITC UPN "Veteran" Yogyakarta
        </div>
      </div>
    </footer>
  );
};

export default Footer;
