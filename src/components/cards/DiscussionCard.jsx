import { Icon } from '@iconify/react';
import Button from '../buttons/Button';

const DiscussionCard = ({ discussion, ...props }) => {
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
          <div>{discussion.fullName}</div>
          <div className='text-xs sm:text-sm text-gray-dark'>
            {discussion.createdAt}
          </div>
        </div>
        <span className='text-gray-dark'>
          <Icon icon='bx:dots-vertical-rounded' width='18' />
        </span>
      </div>

      {/* Isi Card */}
      <main className='mt-2 sm:mt-2.5'>
        <div className='font-bold sm:text-lg mb-1 sm:mb-0.5'>
          {discussion.title}
        </div>
        <p>{discussion.body}</p>
      </main>

      {/* Reply Button */}
      {props.isReply && (
        <div className='mt-3'>
          <Button
            onClick={props.onClick}
            variant='icon-left'
            color='secondary'
            icon='ic:baseline-reply'
            size='small'
          >
            Balas
          </Button>
        </div>
      )}
    </div>
  );
};

export default DiscussionCard;
