import Button from '../buttons/Button';
import { Select } from '../forms';

const ManageUserCard = ({ user, setRole, setVerify }) => {
  return (
    <div className='px-4 pt-3.5'>
      <div className='grid grid-cols-6 gap-2.5 sm:flex sm:gap-2 items-center'>
        <div className='col-span-5 sm:w-full text-sm'>
          <p>{user?.fullName}</p>
          <span className='text-gray-dark'>{user?.email}</span>
        </div>
        <div className='col-span-6 order-3 sm:order-2 flex gap-2'>
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
          {setVerify && (
            <div className='w-full sm:w-48'>
              <Select
                onChange={(e) => setVerify(e.target.value, user.id)}
                value={user?.verify}
                color='secondary'
              >
                <option className='bg-white' value={true}>
                  Terverifikasi
                </option>
                <option className='bg-white' value={false}>
                  Belum Terverifikasi
                </option>
              </Select>
            </div>
          )}
        </div>
        <div className='justify-self-end order-2 sm:order-last'>
          <Button variant='icon-only' color='danger' icon='bxs:trash' />
        </div>
      </div>

      {/* Pembatas */}
      <div className='mt-3.5 w-full h-[1px] bg-gray-light'></div>
    </div>
  );
};

export default ManageUserCard;
