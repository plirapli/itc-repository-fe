import { useState } from 'react';
import Button from '../../components/buttons/Button';
import { DiskusiCard, KomentarCard } from '../../components/cards/index';

const Komentar = () => {
  const [showReply, setShowReply] = useState(true);

  const displayReplyHandler = () => setShowReply((prev) => !prev);
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const komentarList = ['1', '2', '3', '4']; // Dummy

  return (
    <div className='w-full py-4 px-5 sm:py-6 sm:px-0'>
      {/* Pertanyaan */}
      <DiskusiCard isReply={true} onClick={displayReplyHandler} />

      {/* Input Reply */}
      {showReply && (
        <div className='mt-4'>
          <div className='text-primary font-medium'>Isi Diskusi</div>
          <form onSubmit={submitHandler} className='mt-1.5'>
            <textarea
              className='w-full px-3 py-1.5 outline-none rounded resize-none'
              name=''
              id=''
              rows='7'
            ></textarea>
            <div className='mt-3 flex gap-3'>
              <Button
                onClick={displayReplyHandler}
                type='textOnly'
                styleType='secondary'
                text='Kembali'
              />
              <Button type='textOnly' text='Kirim' attrType='submit' />
            </div>
          </form>
        </div>
      )}

      {/* Komentar */}
      <section className='mt-4'>
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
