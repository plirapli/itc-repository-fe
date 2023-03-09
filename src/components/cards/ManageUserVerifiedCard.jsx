import { Select } from '../forms';
import Tags from '../tags/Tags';

const ManageUserVerifiedCard = ({ user, setRole }) => {
  return (
    <div className='px-4 py-3.5 flex justify-between items-center gap-2 border-b'>
      <div>
        <div className='w-full flex gap-1.5 text-sm'>
          <p className='inline'>{user?.fullName}</p>
          <span>∙</span>
          <p className='text-gray-dark'>{user?.username}</p>
        </div>
        <p className='text-sm text-left text-gray-dark'>{user?.email}</p>
      </div>
      <div className='w-full sm:w-32'>
        <Select
          onChange={(e) => setRole(e.target.value, user.id)}
          value={user?.id_role}
          color='secondary'
        >
          <option className='bg-white' value='1'>
            User
          </option>
          <option className='bg-white' value='2'>
            Admin
          </option>
        </Select>
      </div>
    </div>
  );
};

export default ManageUserVerifiedCard;
