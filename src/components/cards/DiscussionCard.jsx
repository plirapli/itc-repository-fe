import Button from '../buttons/Button';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

const DiscussionCard = ({ discussion, ...props }) => {
  return (
    <div className='bg-white px-3.5 py-3 pr-2 rounded-lg shadow'>
      {/* Header Card */}
      <div className='flex items-center gap-2'>
        <img
          className='bg-slate-400 max-w-[2rem] h-8 rounded-full overflow-hidden'
          loading='lazy'
          src=''
          alt='profil'
        />
        <div className='w-full flex flex-col'>
          <p className='text-sm truncate'>{discussion.fullName}</p>
          <div className='text-xs text-gray-dark'>{discussion.createdAt}</div>
        </div>
        <EllipsisVerticalIcon className='self-start -mr-1 w-4 text-gray-dark' />
      </div>

      {/* Isi Card */}
      <main className='mt-1.5'>
        <div>{discussion.title}</div>
        <p className='text-gray-dark text-sm clamp'>{discussion.body}</p>
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
