import { useEffect, useState } from "react";
import { DiscussionCard, CommentCard } from "../../components/cards/index";
import Button from "../../components/buttons/Button";
import { getDiscussionById } from "../../utils/discussions";
import { useParams } from "react-router-dom";
import CommentLists from "../../components/lists/CommentLists";
import { addComment, getAllDiscussionsComments } from "../../utils/comments";
import AddCommentForm from "../../components/forms/AddCommentForm";

const CommentPage = () => {
  const [initializing, setInitializing] = useState(true);
  const [discussion, setDiscussion] = useState({});
  const [comments, setComments] = useState([]);
  const [showReply, setShowReply] = useState(false);
  const { id_course: courseId, id_discussion: discussionId } = useParams();
  const [body, setBody] = useState("");
  const inputBodyHandler = (e) => setBody(e.target.value);

  const displayReplyHandler = () => setShowReply((prev) => !prev);
  const submitHandler = (e) => {
    e.preventDefault();
    addComment({ courseId, discussionId, body });
    setBody("");
    getAllDiscussionsComments(courseId, discussionId)
      .then((data) => {
        setComments(data);
      })
      .catch(({ data }) => console.log(data.message));
  };

  useEffect(() => {
    getDiscussionById(courseId, discussionId)
      .then((data) => {
        setDiscussion(data);
        setInitializing(false);
      })
      .catch(({ data }) => console.log(data.message));

    getAllDiscussionsComments(courseId, discussionId)
      .then((data) => {
        setComments(data);
        setInitializing(false);
      })
      .catch(({ data }) => console.log(data.message));
  }, []);

  if (initializing) return null;

  return (
    <div className="w-full py-4 px-5 sm:py-6 sm:px-0">
      {/* Pertanyaan */}
      <DiscussionCard
        isReply={true}
        onClick={displayReplyHandler}
        discussion={discussion}
      />

      {/* Input Reply */}
      {showReply && (
        <AddCommentForm
          displayReplyHandler={displayReplyHandler}
          submitHandler={submitHandler}
          inputBodyHandler={inputBodyHandler}
          body={body}
        ></AddCommentForm>
      )}

      {/* Komentar */}
      <CommentLists comments={comments}></CommentLists>
    </div>
  );
};

export default CommentPage;
