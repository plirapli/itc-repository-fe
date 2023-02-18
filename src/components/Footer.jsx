const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='w-full bg-primary flex justify-center'>
      <div className='w-full max-w-screen-xl px-5 sm:px-6'>
        {/* Upper Side */}
        <div className='py-2.5 flex flex-col sm:flex-row gap-2 sm:justify-between'>
          {/* Left Side */}
          <div>
            <div className='w-max text-accent font-bold'>
              Information Technology Club
            </div>
            <div className='w-max text-white font-medium text-sm'>
              UPN "Veteran" Yogyakarta
            </div>
          </div>

          {/* Right Side */}
          <div className='text-[12.5px] text-white flex items-center gap-2 font-medium'>
            <a
              className='transition-all hover:text-accent'
              target='_blank'
              href='https://goo.gl/maps/eep7ZaHqjaEkm6CdA'
              rel='noreferrer'
            >
              LOKASI
            </a>
            <span className='text-base'>|</span>
            <a
              className='transition-all hover:text-accent'
              target='_blank'
              href='https://instagram.com/itcupnyk'
              rel='noreferrer'
            >
              KONTAK
            </a>
            <span className='text-base'>|</span>
            <a
              className='transition-all hover:text-accent'
              target='_blank'
              href='https://instagram.com/itcupnyk'
              rel='noreferrer'
            >
              TENTANG KAMI
            </a>
          </div>
        </div>
        <hr />
        {/* Lower Side */}
        <div className='py-2.5 text-xs text-center text-accent'>
          &copy; {year} ITC UPNVY, All Right Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
