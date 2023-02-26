import {
  DocumentMagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import ButtonMin from '../buttons/ButtonMin';

const ManageCourseCard = ({ type, children, ...props }) => {
  return (
    <div className='w-full p-3 bg-white flex flex-col sm:flex-row sm:items-center gap-3 rounded-md shadow-sm'>
      <div className='w-full sm:text-sm text-left'>{children}</div>

      {/* Action Button */}
      <div className='grid grid-flow-col sm:flex gap-1'>
        <ButtonMin
          onClick={props.onClickEdit}
          variant='icon-only'
          size='small'
          color='secondary'
          icon={<PencilIcon />}
        />
        {type === 'course' && (
          <Link to={props.onClickDetail}>
            <ButtonMin
              variant='icon-only'
              size='small'
              color='secondary'
              icon={<DocumentMagnifyingGlassIcon />}
            />
          </Link>
        )}
        <ButtonMin
          onClick={props.onClickDelete}
          variant='icon-only'
          size='small'
          color='danger'
          icon={<TrashIcon />}
        />
      </div>
    </div>
  );
};

export default ManageCourseCard;
