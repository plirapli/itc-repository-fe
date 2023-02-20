import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Button from '../buttons/Button';
import { Disclosure } from '@headlessui/react';

const OverlayMateriList = ({ courseID, materiList, setIsClicked }) => {
  return (
    <div className='w-full sm:w-[25rem] absolute top-0 right-0 px-6 py-5 min-h-screen bg-white flex flex-col gap-4'>
      {/* Header */}
      <div className='flex items-center gap-2'>
        <div className='w-full'>
          <h1 className='text-xl'>Daftar Materi</h1>
        </div>
        <Button
          onClick={setIsClicked}
          variant='icon-only'
          icon='eva:close-fill'
          color='gray'
          size='small'
        />
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
                  {Articles.map(({ id: articleID, title }) => (
                    <Link
                      key={articleID}
                      to={`course/${courseID}/chapter/${chapterID}/article/${articleID}`}
                    >
                      <div className='px-4 py-3 bg-secondary truncate hover:bg-secondaryHover'>
                        {title}
                      </div>
                    </Link>
                  ))}
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
