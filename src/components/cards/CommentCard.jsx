import { Icon } from '@iconify/react';

const CommentCard = ({ comment }) => {
  return (
    <div className='bg-white flex gap-2.5 p-2.5 pr-1 rounded-lg shadow'>
      <img
        className='bg-slate-400 max-w-[2rem] h-8 rounded-full overflow-hidden'
        src=''
        alt='profile'
      />
      <div className='w-full'>
        <div className='flex'>
          <div className='w-full font-medium text-sm'>{comment.fullName}</div>
          <span className='text-gray-dark'>
            <Icon icon='bx:dots-vertical-rounded' width='16' />
          </span>
        </div>
        <p className='text-sm'>{comment.body}</p>
      </div>
    </div>
  );
};

export default CommentCard;
