import { Icon } from '@iconify/react';
import Button from '../buttons/Button';

const DiskusiCard = (props) => {
  return (
    <div className='bg-white px-4 pt-3 pb-4 rounded-lg shadow'>
      {/* Header Card */}
      <div className='flex justify-between items-center gap-2'>
        <img
          className='bg-slate-400 max-w-[2rem] h-8 rounded overflow-hidden'
          src=''
          alt='Profile'
        />
        <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between sm:mt-0.5'>
          <div>Muhammad Rafli</div>
          <div className='text-xs sm:text-base text-gray-dark'>12/10/2022</div>
        </div>
        <span className='text-gray-dark'>
          <Icon icon='bx:dots-vertical-rounded' width='24' />
        </span>
      </div>

      {/* Isi Card */}
      <main className='mt-2 sm:mt-2.5'>
        <div className='font-bold sm:text-lg mb-1 sm:mb-0.5'>
          Lorem ipsum dolor sit amet
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          delectus a architecto voluptate reprehenderit necessitatibus, debitis
          amet repudiandae? Possimus eaque porro expedita consectetur. Quae vel
          voluptate voluptas dolor iusto rerum!
        </p>
      </main>

      {/* Reply Button */}
      {props.isReply && (
        <div className='mt-4 mb-1'>
          <Button
            type='iconLeft'
            styleType='secondary'
            text='Balas Pertanyaan'
            icon='fluent:comment-16-filled'
            onClick={props.onClick}
          />
        </div>
      )}
    </div>
  );
};

export default DiskusiCard;
