import { Logo } from '../assets';
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <footer className='w-full px-5 sm:px-6 bg-primary flex justify-center'>
      <div className='w-full max-w-screen-xl flex flex-col'>
        {/* Upper Layer */}
        <div className='py-3 sm:py-4 flex flex-col md:flex-row gap-2 sm:gap-5 sm:justify-between'>
          {/* Logo & Tulisan ITC */}
          <div className='flex items-center gap-5'>
            <div className='px-5 py-2 bg-secondary rounded hidden sm:block md:hidden lg:block'>
              <img src={Logo} alt='Logo ITC' className='max-w-[2rem]' />
            </div>
            <div>
              <div className='w-max text-accent font-bold h2-sm sm:h2-md'>
                Information Technology Club
              </div>
              <div className='w-max text-white font-medium sm:text-xl'>
                UPN "Veteran" Yogyakarta
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2 sm:flex-row sm:gap-8 md:justify-evenly'>
            {/* Lokasi */}
            <div className='text-white flex flex-col gap-1.5 w-100 sm:w-1/2'>
              <div className='font-bold sm:text-xl'>Lokasi</div>
              <div className='w-full h-[2px] bg-white'></div>
              <div>
                Jl. Tambak Bayan No. 22, Janti, Caturtunggal, Kec. Depok, Kab.
                Sleman, Daerah Istimewa Yogyakarta 55281
              </div>
            </div>

            {/* Kontak */}
            <div className='text-white flex flex-col gap-1.5 w-100 sm:w-1/2 md:w-auto'>
              <div className='w-max font-bold sm:text-xl'>Kontak Kami</div>
              <div className='w-full h-[2px] bg-white'></div>
              <div className='flex gap-1.5'>
                <a
                  target='_blank'
                  href='https://instagram.com/itcupnyk'
                  rel='noreferrer'
                >
                  <div className='w-8 sm:w-9 transition-all hover:text-accent'>
                    <Icon icon='mdi:instagram' width='100%' />
                  </div>
                </a>
                <div className='w-8 sm:w-9 transition-all hover:text-accent'>
                  <Icon icon='ic:baseline-whatsapp' width='100%' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
