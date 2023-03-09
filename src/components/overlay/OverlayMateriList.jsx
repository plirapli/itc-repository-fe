import { Link } from 'react-router-dom';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Disclosure } from '@headlessui/react';

const OverlayMateriList = ({ courseID, materiList, setIsClicked, active }) => {
  return (
    <div className='overlay-materi p-5 bg-white flex flex-col gap-4'>
      {/* Header */}
      <div className='flex items-center gap-2'>
        <div className='w-full'>
          <h1 className='text-xl'>Daftar Materi</h1>
        </div>
        <button
          onClick={setIsClicked}
          className='w-6 text-gray-dark transition-all hover:text-black'
        >
          <XMarkIcon />
        </button>
      </div>

      {/* Chapter & Article Card */}
      {materiList.map(({ id: chapterID, title, Articles }) => (
        <div
          key={chapterID}
          className='bg-secondary rounded-md overflow-hidden'
        >
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='flex w-full justify-between items-center bg-secondary px-4 py-3 text-left text-sm font-medium transition-all hover:bg-secondaryHover focus:outline-none focus-visible:ring focus-visible:ring-primary  focus-visible:ring-opacity-75'>
                  <div className='w-full flex flex-col items-start gap-1'>
                    <p className='w-full font-medium text-sm'>{title}</p>
                    <div className='px-1 bg-primary text-white text-xs rounded'>
                      {Articles.length} Artikel
                    </div>
                  </div>
                  <ChevronDownIcon
                    className={`w-5 transition-all ${open && 'rotate-180'}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel>
                  <div className='border-t border-primary'>
                    {Articles.length > 0 ? (
                      <div className='pb-2.5'>
                        {Articles.map(({ id: articleID, title }) => (
                          <Link
                            key={articleID}
                            to={`course/${courseID}/chapter/${chapterID}/article/${articleID}`}
                          >
                            <div
                              className={`px-4 py-2.5 truncate text-black ${
                                articleID == active
                                  ? 'font-medium'
                                  : 'text-sm text-opacity-30'
                              } transition-all hover:text-opacity-100`}
                            >
                              {title}
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className='px-4 py-2.5 text-sm text-center text-gray-dark'>
                        Artikel belum ada.
                      </div>
                    )}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </div>
  );
};

export default OverlayMateriList;
