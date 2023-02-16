import { Icon } from "@iconify/react";

const CommentCard = ({ comment, props }) => {
  return (
    <div className="bg-white flex gap-3 px-4 pt-3 pb-4 rounded-lg shadow">
      <img
        className="bg-slate-400 max-w-[2rem] h-8 rounded overflow-hidden"
        src=""
        alt="Profile"
      />
      <div className="w-full">
        <div className="flex mb-0.5">
          <div className="w-full font-bold">{comment.fullName}</div>
          <span className="text-gray-dark">
            <Icon icon="bx:dots-vertical-rounded" width="24" />
          </span>
        </div>
        <p>{comment.body}</p>
      </div>
    </div>
  );
};

export default CommentCard;
