import React, { useEffect, useState } from "react";
import SingleComement from "../SingleComement/SingleComement";

function ReplyComment({
  CommentLists,
  parentCommentId,
  videoId,
  refreshFunction,
}) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [ReplyComments, setReplyComments] = useState(false);
  useEffect(() => {
    let commentNumber = 0;
    CommentLists.map((comment) => {
      if (comment.responseTo === parentCommentId) {
        commentNumber++;
      }
    });

    setChildCommentNumber(commentNumber);
  }, [CommentLists]);
  console.log("ReplyComment", ReplyComments);

  const renderReplyComment = () => {
    return CommentLists.map((comment, index) => {
      //   console.log(comment.responseTo, "gdgd", parentCommentId);
      return (
        <>
          {comment.responseTo === parentCommentId && (
            <div style={{ marginLeft: "40px" }}>
              <SingleComement
                comment={comment}
                postId={videoId}
                refreshFunction={refreshFunction}
              />
              <ReplyComment
                CommentLists={CommentLists}
                postId={videoId}
                parentCommentId={comment._id}
              />
            </div>
          )}
        </>
      );
    });
  };

  const onHandleChange = () => {
    setReplyComments(!ReplyComments);
  };
  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p onClick={onHandleChange}>{ChildCommentNumber} 개보다 많은 댓글</p>
      )}

      {ReplyComments && renderReplyComment()}
    </div>
  );
}

export default ReplyComment;
