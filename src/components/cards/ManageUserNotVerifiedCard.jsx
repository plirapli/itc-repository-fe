import { formatDateWithHour } from '../../utils/dateConverter';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const ManageUserNotVerifiedCard = ({ user, acceptUser, rejectUser }) => {
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
          <div className='mt-1.5 text-xs text-gray-dark'>
            Dibuat pada {formatDateWithHour(user?.createdAt)}
          </div>
        </div>
        <div className='flex gap-0.5'>
          <button
            onClick={() => acceptUser(user?.id)}
            className='text-primary transition-all hover:text-opacity-50'
          >
            <CheckCircleIcon className='w-[1.75rem]' />
          </button>
          <button
            onClick={() => rejectUser(user?.id)}
            className='text-danger-main transition-all hover:text-opacity-50'
          >
            <XCircleIcon className='w-[1.75rem]' />
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageUserNotVerifiedCard;
