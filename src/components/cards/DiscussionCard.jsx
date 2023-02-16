import { Icon } from '@iconify/react';
import Button from '../buttons/Button';

const DiscussionCard = ({ discussion, ...props }) => {
  return (
    <div className='bg-white px-3.5 py-3 pr-2 rounded-lg shadow'>
      {/* Header Card */}
      <div className='flex justify-between items-center gap-2'>
        <img
          className='bg-slate-400 max-w-[2rem] h-8 rounded-full overflow-hidden'
          src=''
          alt='profil'
        />
        <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between sm:mt-0.5'>
          <p className='text-sm'>{discussion.fullName}</p>
          <div className='text-xs sm:text-sm text-gray-dark'>
            {discussion.createdAt}
          </div>
        </div>
        <span className='text-gray-dark'>
          <Icon icon='bx:dots-vertical-rounded' width='18' />
        </span>
      </div>

      {/* Isi Card */}
      <main className='mt-1.5'>
        <div className='font-bold'>{discussion.title}</div>
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
