import { formatDateWithHour } from '../../utils/dateConverter';
import Button from '../buttons/Button';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Tags from '../tags/Tags';

const ManageUserNotVerifiedCard = ({ user, setVerify }) => {
  return (
    <>
      <div className='w-full px-4 py-3 flex justify-between items-center gap-2 border-b bg-white focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75'>
        <div>
          <div className='w-full flex gap-1.5 text-sm'>
            <p className='inline'>{user?.fullName}</p>
            <span>∙</span>
            <p className='text-gray-dark'>{user?.username}</p>
          </div>
          <p className='text-sm text-left text-gray-dark'>{user?.email}</p>
          <div className='mt-1.5'>
            <Tags id={user?.id_division} />
          </div>
          <div className='mt-1.5 text-xs text-gray-dark'>
            Dibuat pada {formatDateWithHour(user?.createdAt)}
          </div>
        </div>
        <div className='flex gap-0.5'>
          <button className='transition-all text-primary hover:text-opacity-50'>
            <CheckCircleIcon className='w-[1.75rem]' />
          </button>
          <button className='text-danger-main transition-all hover:text-opacity-50'>
            <XCircleIcon className='w-[1.75rem]' />
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageUserNotVerifiedCard;
