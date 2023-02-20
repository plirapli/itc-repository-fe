import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDiscussionById } from '../../utils/discussions';
import { addComment, getAllComments } from '../../utils/comments';
import OverlayLoading from '../../components/overlay/OverlayLoading';
import { DiscussionCard } from '../../components/cards/index';
import AddCommentForm from '../../components/forms/AddCommentForm';
import CommentLists from '../../components/lists/CommentLists';
import { ModalDelete } from '../../components/modal';

const CommentPage = () => {
  const { id_course: courseID, id_discussion: discussionID } = useParams();
  const [initializing, setInitializing] = useState(true);
  const [discussion, setDiscussion] = useState({});
  const [comments, setComments] = useState([]);
  const [showReply, setShowReply] = useState(false);
  const [body, setBody] = useState('');
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const closeModalDelete = () => setIsModalDeleteOpen(false);

  const onClickEditHandler = (e) => {
    e.preventDefault();
  };
  const onClickDeleteHandler = (e) => {
    e.preventDefault();
    setIsModalDeleteOpen(true);
  };

  const inputBodyHandler = (e) => setBody(e.target.value);
  const displayReplyHandler = () => setShowReply((prev) => !prev);

  // Submit comment
  const submitHandler = (e) => {
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
      .catch(({ data }) => console.log(data.message));

    getAllCommentsHandler();
  }, []);

  return (
    <>
      <div className='w-full py-4 px-5 sm:py-6 sm:px-0'>
        {/* Pertanyaan */}
        <DiscussionCard
          isReply={true}
          onClick={displayReplyHandler}
          discussion={discussion}
        />

        {/* Input Reply */}
        {showReply && (
          <AddCommentForm
            onSubmit={submitHandler}
            onChange={inputBodyHandler}
            body={body}
          />
        )}

        {/* Komentar */}
        <CommentLists
          comments={comments}
          onClickEdit={onClickEditHandler}
          onClickDelete={onClickDeleteHandler}
        />
      </div>

      {/* Delete dialog (modal) */}
      <ModalDelete
        show={isModalDeleteOpen}
        onClose={closeModalDelete}
        onClickDelete={closeModalDelete}
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
