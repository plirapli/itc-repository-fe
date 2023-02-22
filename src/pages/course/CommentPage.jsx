import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteDiscussion,
  editDiscussion,
  getDiscussionById,
} from '../../utils/discussions';
import {
  addComment,
  getAllComments,
  deleteComment,
  editComment,
} from '../../utils/comments';
import OverlayLoading from '../../components/overlay/OverlayLoading';
import { DiscussionCard } from '../../components/cards/index';
import AddCommentForm from '../../components/forms/AddCommentForm';
import CommentLists from '../../components/lists/CommentLists';
import { ModalDelete, ModalForm } from '../../components/modal';
import Button from '../../components/buttons/Button';
import { Input } from '../../components/forms';

const CommentPage = ({ user }) => {
  const { id_course: courseID, id_discussion: discussionID } = useParams();
  const [highlightedCommentID, setHighlightedCommentID] = useState('');
  const [highlightedCommentBody, setHighlightedCommentBody] = useState('');
  const [discussionTmp, setDiscussionTmp] = useState({});
  const [initializing, setInitializing] = useState(true);
  const [discussion, setDiscussion] = useState({});
  const [comments, setComments] = useState([]);
  const [showReply, setShowReply] = useState(false);
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const [isModalEditDiscussionOpen, setIsModalEditDiscussionOpen] =
    useState(false);
  const [isModalDeleteDiscussionOpen, setIsModalDeleteDiscussionOpen] =
    useState(false);
  const [isModalEditCommentOpen, setIsModalEditCommentOpen] = useState(false);
  const [isModalDeleteCommentOpen, setIsModalDeleteCommentOpen] =
    useState(false);

  const closeModalCommentEdit = () => setIsModalEditCommentOpen(false); // Tutup overlay (modal) edit diskusi
  const closeModalCommentDelete = () => setIsModalDeleteCommentOpen(false); // Tutup overlay (modal) delete diskusi
  const closeModalDiscussionEdit = () => setIsModalEditDiscussionOpen(false); // Tutup overlay (modal) edit komentar
  const closeModalDiscussionDelete = () =>
    setIsModalDeleteDiscussionOpen(false); // Tutup overlay (modal) delete komentar

  // Handler buat menu edit diskusi
  const onClickEditDiscussionOpenModalHandler = (e) => {
    e.preventDefault();
    setDiscussionTmp(discussion);
    setIsModalEditDiscussionOpen(true);
  };

  const onClickEditDiscussionHandler = (e) => {
    e.preventDefault();
    editDiscussion(courseID, discussionID, discussionTmp)
      .then(() => {
        getDiscussionById(courseID, discussionID)
          .then((data) => {
            setDiscussion(data);
          })
          .catch((err) => console.log(err));
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => {
        setInitializing(false);
        setIsModalEditDiscussionOpen(false);
      });
  };

  // Handler buat menu delete diskusi
  const onClickDeleteDiscussionOpenModalHandler = (e) => {
    e.preventDefault();
    setIsModalDeleteDiscussionOpen(true);
  };

  const onClickDeleteDiscussionHandler = (e) => {
    e.preventDefault();
    // navigate('/course/' + courseID + '/discussion', { replace: true });
    deleteDiscussion(courseID, discussionID)
      .then(() => {
        navigate('/course/' + courseID + '/discussion', { replace: true });
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => setInitializing(false));
    setIsModalDeleteDiscussionOpen(false);
  };

  // Handler buat menu edit komentar
  const onClickEditCommentOpenModalHandler = (e, commentID, commentBody) => {
    e.preventDefault();
    setHighlightedCommentID(commentID);
    setHighlightedCommentBody(commentBody);
    setIsModalEditCommentOpen(true);
  };

  const onClickEditCommentHandler = (e) => {
    e.preventDefault();
    editComment(
      courseID,
      discussionID,
      highlightedCommentID,
      highlightedCommentBody
    )
      .then(() => {
        getAllCommentsHandler();
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => {
        setInitializing(false);
        setIsModalEditCommentOpen(false);
      });
  };

  // Handler buat menu deletekomentar
  const onClickDeleteCommentOpenModalHandler = (e, commentID) => {
    e.preventDefault();
    setHighlightedCommentID(commentID);
    setIsModalDeleteCommentOpen(true);
  };

  const onClickDeleteCommentHandler = (e) => {
    e.preventDefault();
    deleteComment(courseID, discussionID, highlightedCommentID)
      .then(() => {
        getAllCommentsHandler();
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => setInitializing(false));
    setIsModalDeleteCommentOpen(false);
  };

  const inputBodyHandler = (e) => setBody(e.target.value);
  const displayReplyHandler = () => setShowReply((prev) => !prev);

  // Submit comment
  const submitCommentHandler = (e) => {
    e.preventDefault();

    setInitializing(true);
    addComment(courseID, discussionID, body)
      .then(() => {
        setBody('');
        getAllCommentsHandler();
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => setInitializing(false));
  };

  const getAllCommentsHandler = () => {
    getAllComments(courseID, discussionID)
      .then(setComments)
      .catch(({ data }) => console.log(data.message))
      .finally(() => setInitializing(false));
  };

  useEffect(() => {
    getDiscussionById(courseID, discussionID)
      .then((data) => {
        setDiscussion(data);
        setInitializing(false);
      })
      .catch(({ data }) => {
        console.log(data.message);
      });

    getAllCommentsHandler();
  }, []);

  if (initializing) return <OverlayLoading loadingState={initializing} />;

  return (
    <>
      <div className='w-full py-4 px-5 sm:py-6 sm:px-0'>
        {/* Pertanyaan */}
        <DiscussionCard
          user={user}
          isReply={true}
          onClick={displayReplyHandler}
          discussion={discussion}
          onClickEdit={onClickEditDiscussionOpenModalHandler}
          onClickDelete={onClickDeleteDiscussionOpenModalHandler}
        />

        {/* Input Reply */}
        {showReply && (
          <AddCommentForm
            onSubmit={submitCommentHandler}
            onChange={inputBodyHandler}
            body={body}
          />
        )}

        {/* Komentar */}
        <CommentLists
          comments={comments}
          onClickEdit={onClickEditCommentOpenModalHandler}
          onClickDelete={onClickDeleteCommentOpenModalHandler}
        />
      </div>

      {/* Edit discuss dialog (modal) */}
      <ModalForm show={isModalEditDiscussionOpen} title='Edit Pertanyaan'>
        <form>
          {/* Judul */}
          <div>
            <Input
              onChange={(e) =>
                setDiscussionTmp((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              label='Judul'
              value={discussionTmp.title}
              color='secondary'
              placeholder='Masukkan judul pertanyaan'
              required
            />
          </div>

          {/* Deskripsi */}
          <div className='mt-2'>
            <label htmlFor='body' className='block text-sm font-medium'>
              Pertanyaan
            </label>
            <textarea
              onChange={(e) =>
                setDiscussionTmp((prev) => ({
                  ...prev,
                  body: e.target.value,
                }))
              }
              id='body'
              name='body'
              value={discussionTmp.body}
              rows={5}
              className='input-secondary mt-1 block w-full rounded-md shadow-sm focus-primary sm:text-sm resize-none'
              placeholder='Deskripsi materi'
              required
            />
          </div>

          <div className='mt-4 flex gap-2'>
            <Button
              onClick={closeModalDiscussionEdit}
              color='gray'
              size='small'
            >
              Tutup
            </Button>
            <Button
              size='small'
              onClick={(e) => {
                onClickEditDiscussionHandler(e, discussionTmp);
              }}
            >
              Simpan
            </Button>
          </div>
        </form>
      </ModalForm>

      {/* Delete discuss dialog (modal) */}
      <ModalDelete
        show={isModalDeleteDiscussionOpen}
        onClose={closeModalDiscussionDelete}
        onClickDelete={(e) => onClickDeleteDiscussionHandler(e)}
        title='Hapus Pertanyaan'
      >
        <p className='text-sm text-gray-500'>
          Apakah anda yakin ingin menghapus pertanyaan ini?
        </p>
      </ModalDelete>

      {/* Edit comment dialog (modal) */}
      <ModalForm show={isModalEditCommentOpen} title='Edit komentar'>
        {/* Ini ditambahin handler onSubmit buat edit */}
        <form>
          <textarea
            onChange={(e) => setHighlightedCommentBody(e.target.value)}
            id='about'
            name='about'
            value={highlightedCommentBody}
            rows={5}
            className='input-secondary mt-2 block w-full rounded-md shadow-sm focus-primary sm:text-sm resize-none'
            placeholder='Masukkan komentar'
            required
          />
          <div className='mt-4 flex gap-2'>
            <Button onClick={closeModalCommentEdit} color='gray' size='small'>
              Tutup
            </Button>
            <Button type='submit' size='small'>
              Simpan
            </Button>
          </div>
        </form>
      </ModalForm>

      {/* Delete comment dialog (modal) */}
      <ModalDelete
        show={isModalDeleteCommentOpen}
        onClose={closeModalCommentDelete}
        onClickDelete={onClickDeleteCommentHandler}
        title='Hapus Komentar'
      >
        <p className='text-sm text-gray-500'>
          Apakah anda yakin ingin menghapus komentar ini?
        </p>
      </ModalDelete>

      {/* Loading state */}
      {/* <OverlayLoading loadingState={initializing} /> */}
      {/* code di atas ngebuat bug */}
      {/* selalu gunakan conditional kalau mau manfaatin semacam loading,
          jangan langsung ditaruh di situ.
          react pertama bakal ngerender component dulu baru ngejalanin useEffect. 
          Sedangkan card Discussion punya kebutuhan terhadap data
          yang diambil melalui useEffect.
          Disitulah letak bugnya. Component gapunya data yang cukup tapi dipaksa render.
          jadinya bakal selalu munculin Uncaught TypeError: Cannot read properties of undefined 
      */}
    </>
  );
};

export default CommentPage;
