import { Link } from 'react-router-dom';
import { DiscussionCard } from '../cards';

const DiscussionLists = ({ discussions, ...props }) => {
  if (discussions.length === 0)
    return (
      <div className='mt-3 flex flex-col gap-3'>
        <p className='text-center'>Belum ada pertanyaan</p>
      </div>
    );

  return (
    <div className='mt-3 flex flex-col gap-3'>
      {discussions.map((discussion) => (
        <Link key={discussion.id} to={`${discussion.id}`}>
          <DiscussionCard discussion={discussion} {...props} />
        </Link>
      ))}
    </div>
  );
};

export default DiscussionLists;
