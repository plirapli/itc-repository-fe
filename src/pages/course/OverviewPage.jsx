import { Link, useOutletContext, useParams } from 'react-router-dom';
import { useTitle } from '../../hooks';

// Component
import { UserCircleIcon } from '@heroicons/react/20/solid';
import Button from '../../components/buttons/Button';
import Tags from '../../components/tags/Tags';
import { OverlayLoading } from '../../components/overlay';

const OverviewPage = () => {
  const [course, isInit] = useOutletContext();
  const { id_course } = useParams();
  const initArticle = course.chapterArticles?.chapters[0].Articles[0];
  useTitle(course?.title || 'Loading...', course);

  if (!isInit) {
    return (
      <div className='w-full py-4 px-5 sm:py-6 sm:px-0 flex flex-col gap-3 sm:gap-4'>
        {/* Overview */}
        <div className='w-full flex flex-col sm:flex-row gap-3 sm:gap-4'>
          <img
            className='w-full h-48 sm:max-w-[19rem] object-cover bg-zinc-400 rounded-lg overflow-hidden'
            loading='lazy'
            src={course?.image_thumbnail}
            alt='course-thumbnail'
          />
          <div className='flex flex-col items-start justify-between'>
            <div className='flex flex-col gap-1.5'>
              <div>
                <h2 className='text-lg font-medium clamp'>{course?.title}</h2>
                <div className='text-gray-dark text-sm mt-1'>
                  {course?.chapterArticles?.chapterLength} Bab |{' '}
                  {course?.chapterArticles?.articlesLength} Artikel
                </div>
              </div>
              <Tags divName={course?.Division?.divisionName} />
              <div className='flex items-center gap-1 text-black'>
                <UserCircleIcon className='w-5' />
                <span className='text-sm'>{course?.User?.fullName}</span>
              </div>
            </div>

            <div className='mt-1.5'>
              <p className='text-sm text-gray-dark'>
                Dibuat pada {course?.createdAt}
              </p>
              <p className='mt-0.5 text-sm text-gray-dark'>
                Diperbarui pada {course?.updatedAt}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Btn */}
        {initArticle ? (
          <Link
            to={`/course/${id_course}/chapter/${initArticle.id_chapter}/article/${initArticle.id}`}
          >
            <Button variant='text-only'>Belajar Sekarang</Button>
          </Link>
        ) : (
          <Button color='gray' variant='text-only' disabled>
            Kelas ini belum memiliki konten yang dapat dipelajari
          </Button>
        )}

        {/* Deskripsi */}
        <div>
          <h2 className='text-lg'>Deskripsi</h2>
          <p className='mt-0.5 sm:mt-1'>{course?.description}</p>
        </div>
      </div>
    );
  } else return <OverlayLoading loadingState={isInit} />;
};

export default OverviewPage;
