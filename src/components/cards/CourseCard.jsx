import Tags from '../tags/Tags';
import {
  UserCircleIcon,
  CalendarIcon,
  ArrowPathIcon,
} from '@heroicons/react/20/solid';

const CourseCard = ({ data: materi, ...props }) => {
  return (
    <div className='bg-white shadow rounded-lg p-3 h-full'>
      <div
        className='w-full h-40 max-h-80 bg-zinc-300 bg-cover rounded'
        style={{ backgroundImage: `url(${materi.image_thumbnail})` }}
      ></div>
      <div className='mt-1 flex flex-col gap-1'>
        {/* Tags */}
        <div className='mt-1'>
          <Tags divName={materi?.Division?.divisionName} />
        </div>

        {/* Title */}
        <p className='w-full text-sm clamp'>{materi?.title}</p>

        {/* Author */}
        <div className='flex items-center gap-1 text-gray-dark'>
          <UserCircleIcon className='w-4' />
          <span className='text-sm'>{materi?.User.fullName}</span>
        </div>

        {/* Date */}
        <div className='-mt-0.5 flex flex-row items-center gap-1.5 text-gray-dark text-xs'>
          <div className='flex items-center gap-1'>
            <CalendarIcon className='w-4' />
            <p>{materi?.createdAt}</p>
          </div>
          <span className='text-sm'>|</span>
          <div className='flex items-center gap-1'>
            <ArrowPathIcon className='w-4' />
            <p>{materi?.updatedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
