import { Link } from 'react-router-dom';
import { DiscussionCard } from '../cards';

const DiscussionLists = ({ discussions, user, topicKeyword, ...props }) => {
  if (discussions.length === 0)
    if (topicKeyword !== '')
      return (
        <div className='mt-3 flex flex-col gap-3'>
          <p className='text-center'>
            Diskusi dengan topik{' '}
            <span className='font-bold'>{topicKeyword}</span> tidak ditemukan
          </p>
        </div>
      );
    else
      return (
        <div className='mt-3 flex flex-col gap-3'>
          <p className='text-center'>Belum ada diskusi</p>
        </div>
      );

  return (
    <div className='mt-3 flex flex-col gap-3'>
      {discussions.map((discussion) => (
        <Link key={discussion.id} to={`${discussion.id}`}>
          <DiscussionCard user={user} discussion={discussion} {...props} />
        </Link>
      ))}
    </div>
  );
};

export default DiscussionLists;
