import { Icon } from '@iconify/react';

const CommentCard = (props) => {
  return (
    <div className='bg-white flex gap-3 px-4 pt-3 pb-4 rounded-lg shadow'>
      <img
        className='bg-slate-400 max-w-[2rem] h-8 rounded overflow-hidden'
        src=''
        alt='Profile'
      />
      <div className='w-full'>
        <div className='flex mb-0.5'>
          <div className='w-full font-bold'>Muhammad Rafli</div>
          <span className='text-gray-dark'>
            <Icon icon='bx:dots-vertical-rounded' width='24' />
          </span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          delectus a architecto voluptate reprehenderit necessitatibus, debitis
          amet repudiandae? Possimus eaque porro expedita consectetur. Quae vel
          voluptate voluptas dolor iusto rerum!
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
