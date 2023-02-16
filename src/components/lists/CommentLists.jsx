import React from "react";
import { CommentCard } from "../cards";

const CommentLists = ({ comments }) => {
  return (
    <section className="mt-4">
      <h3 className="font-bold text-lg">Komentar</h3>
      <div className="mt-1.5 flex flex-col gap-3">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
};

export default CommentLists;
