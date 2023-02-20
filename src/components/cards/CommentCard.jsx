import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

const CommentCard = ({ comment }) => {
  return (
    <div className='bg-white flex gap-2.5 p-2.5 pr-1 rounded-lg shadow'>
      <img
        className='bg-slate-400 max-w-[2rem] h-8 rounded-full overflow-hidden'
        loading='lazy'
        src=''
        alt='profile'
      />
      <div className='w-full'>
        <div className='flex'>
          <div className='w-full font-medium text-sm'>{comment.fullName}</div>
          <EllipsisVerticalIcon className='w-4 text-gray-dark' />
        </div>
        <p className='text-sm'>{comment.body}</p>
      </div>
    </div>
  );
};

export default CommentCard;
