import { DiskusiCard, KomentarCard } from '../../components/cards/index';

const Komentar = () => {
  const komentarList = ['1', '2', '3', '4']; // Dummy

  return (
    <div className='w-full py-4 px-5 sm:pt-6 sm:pb-2 sm:px-0'>
      {/* Pertanyaan */}
      <DiskusiCard isReply={true} />

      {/* Komentar */}
      <section className='py-4'>
        <h3 className='font-bold text-lg'>Komentar</h3>
        <div className='mt-1.5 flex flex-col gap-3'>
          {komentarList.map((komentar, i) => (
            <KomentarCard key={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Komentar;
