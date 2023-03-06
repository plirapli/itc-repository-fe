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
import { useTitle } from '../../hooks';

// Components
import ButtonMin from '../../components/buttons/ButtonMin';
import { Input } from '../../components/forms';
import OverlayLoading from '../../components/overlay/OverlayLoading';
import { ModalDelete, ModalForm } from '../../components/modal';
import { DiscussionCard } from '../../components/cards';
import CommentLists from '../../components/lists/CommentLists';
import AddCommentForm from '../../components/forms/AddCommentForm';

const CommentPage = () => {
  const { id_course: courseID, id_discussion: discussionID } = useParams();
  const [highlightedComment, setHighlightedComment] = useState({});
  const [discussionTmp, setDiscussionTmp] = useState({});
  const [initializing, setInitializing] = useState(true);
  const [discussion, setDiscussion] = useState({});
  const [comments, setComments] = useState([]);
  const [showReply, setShowReply] = useState(false);
  const [replyBody, setReplyBody] = useState('');
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

  const onSubmitEditDiscussionHandler = (e) => {
    e.preventDefault();
    setInitializing(true);
    editDiscussion(courseID, discussionID, discussionTmp)
      .then(() => {
        getDiscussionByIdHandler();
        setIsModalEditDiscussionOpen(false);
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => setInitializing(false));
  };

  // Handler buat menu delete diskusi
  const onClickDeleteDiscussionOpenModalHandler = (e) => {
    e.preventDefault();
    setIsModalDeleteDiscussionOpen(true);
  };

  const onClickDeleteDiscussionHandler = (e) => {
    e.preventDefault();
    setInitializing(true);
    deleteDiscussion(courseID, discussionID)
      .then(() => {
        navigate('/course/' + courseID + '/discussion', { replace: true });
        setIsModalDeleteDiscussionOpen(false);
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => setInitializing(false));
  };

  // Handler buat menu edit komentar
  const onClickEditCommentOpenModalHandler = (e, selectedComment) => {
    e.preventDefault();
    setHighlightedComment(selectedComment);
    setIsModalEditCommentOpen(true);
  };

  const onSubmitEditCommentHandler = (e) => {
    e.preventDefault();
    setInitializing(true);
    editComment(courseID, discussionID, highlightedComment)
      .then(() => {
        setHighlightedComment({});
        getAllCommentsHandler();
        setIsModalEditCommentOpen(false);
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => setInitializing(false));
  };

  // Handler buat menu delete komentar
  const onClickDeleteCommentOpenModalHandler = (e, selectedComment) => {
    e.preventDefault();
    setHighlightedComment(selectedComment);
    setIsModalDeleteCommentOpen(true);
  };

  const onClickDeleteCommentHandler = (e) => {
    e.preventDefault();
    setInitializing(true);
    deleteComment(courseID, discussionID, highlightedComment.id)
      .then(() => {
        setHighlightedComment({});
        getAllCommentsHandler();
        setIsModalDeleteCommentOpen(false);
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => setInitializing(false));
  };

  const displayReplyHandler = () => setShowReply((prev) => !prev);

  // Submit (reply) comment
  const submitCommentHandler = (e) => {
    e.preventDefault();
    setInitializing(true);
    addComment(courseID, discussionID, replyBody)
      .then(() => {
        setReplyBody('');
        getAllCommentsHandler();
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => setInitializing(false));
  };

  const getDiscussionByIdHandler = () => {
    getDiscussionById(courseID, discussionID)
      .then(setDiscussion)
      .catch(({ data }) => console.log(data.message))
      .finally(() => setInitializing(false));
  };

  const getAllCommentsHandler = () => {
    getAllComments(courseID, discussionID)
      .then(setComments)
      .catch(({ data }) => console.log(data.message))
      .finally(() => setInitializing(false));
  };

  useTitle(discussion?.title || 'Loading...', discussion);
  useEffect(() => {
    getDiscussionById(courseID, discussionID)
      .then((data) => {
        setDiscussion(data);
        getAllComments(courseID, discussionID)
          .then(setComments)
          .catch(({ data }) => console.log(data.message));
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => setInitializing(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='w-full py-4 px-5 sm:py-6 sm:px-0'>
        {/* Pertanyaan */}
        <DiscussionCard
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
            onChange={(e) => setReplyBody(e.target.value)}
            body={replyBody}
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
        <form onSubmit={onSubmitEditDiscussionHandler}>
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
            <ButtonMin
              type='button'
              onClick={closeModalDiscussionEdit}
              color='gray'
              size='small'
            >
              Tutup
            </ButtonMin>
            <ButtonMin size='small'>Simpan</ButtonMin>
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
        <form onSubmit={onSubmitEditCommentHandler}>
          <textarea
            onChange={(e) =>
              setHighlightedComment((prev) => ({
                ...prev,
                body: e.target.value,
              }))
            }
            id='about'
            name='about'
            value={highlightedComment.body}
            rows={5}
            className='input-secondary mt-2 block w-full rounded-md shadow-sm focus-primary sm:text-sm resize-none'
            placeholder='Masukkan komentar'
            required
          />
          <div className='mt-4 flex gap-2'>
            <ButtonMin
              type='button'
              onClick={closeModalCommentEdit}
              color='gray'
              size='small'
            >
              Tutup
            </ButtonMin>
            <ButtonMin size='small'>Simpan</ButtonMin>
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
      <OverlayLoading loadingState={initializing} />
    </>
  );
};

export default CommentPage;
