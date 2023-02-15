import { useEffect, useState } from "react";
import { DiscussionCard, CommentCard } from "../../components/cards/index";
import Button from "../../components/buttons/Button";
import { getDiscussionById } from "../../utils/discussions";
import { useParams } from "react-router-dom";
import CommentLists from "../../components/lists/CommentLists";
import { getAllDiscussionsComments } from "../../utils/comments";

const CommentPage = () => {
  const [showReply, setShowReply] = useState(false);
  const { id_course, id_discussion } = useParams();

  const displayReplyHandler = () => setShowReply((prev) => !prev);
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const [initializing, setInitializing] = useState(true);
  const [discussion, setDiscussion] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getDiscussionById(id_course, id_discussion)
      .then((data) => {
        setDiscussion(data);
        setInitializing(false);
      })
      .catch(({ data }) => console.log(data.message));

    getAllDiscussionsComments(id_course, id_discussion)
      .then((data) => {
        setComments(data);
        setInitializing(false);
      })
      .catch(({ data }) => console.log(data.message));
  }, []);

  console.log(comments);

  // const comments = ["1", "2", "3", "4"]; // Dummy

  if (initializing) return null;

  // console.log(discussion);
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
        <form onSubmit={submitHandler} className="mt-4">
          <label
            htmlFor="komentar"
            className="text-sm font-medium text-primary"
          >
            Tambah komentar
          </label>
          <div className="mt-1">
            <textarea
              id="komentar"
              name="komentar"
              rows={7}
              className="input-primary mt-1 block w-full rounded-md shadow-sm focus-primary sm:text-sm resize-none"
              placeholder="Tuliskan komentar anda"
            />
          </div>
          <div className="mt-3 flex gap-3">
            <Button onClick={displayReplyHandler} color="gray">
              Kembali
            </Button>
            <Button type="submit">Kirim</Button>
          </div>
        </form>
      )}

      {/* Komentar */}
      <CommentLists comments={comments}></CommentLists>
    </div>
  );
};

export default CommentPage;