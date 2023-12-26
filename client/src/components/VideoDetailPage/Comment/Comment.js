import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleComement from "../SingleComement/SingleComement";
import ReplyComment from "./ReplyComment";
function Comment({ CommentLists, postId, refreshFunction }) {
  const user = useSelector((state) => state.user.data);

  const [CommentValue, setCommentValue] = useState("");

  const videoId = useParams();

  const handleClick = (e) => {
    setCommentValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      content: CommentValue,
      writer: user.userData._id,
      postId: videoId.videoId,
    };

    axios.post("/api/comment/saveComment", variable).then((res) => {
      if (res.data.success) {
        console.log(res.data.result);
        setCommentValue("");
        refreshFunction(res.data.result);
      } else {
        alert("댓글 저장하지 못함!");
      }
    });
  };
  return (
    <div>
      <br />
      <p>댓글</p>
      <hr />
      {CommentLists &&
        CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <div>
                <SingleComement
                  comment={comment}
                  postId={videoId}
                  refreshFunction={refreshFunction}
                />
                <ReplyComment
                  CommentLists={CommentLists}
                  parentCommentId={comment._id}
                  videoId={videoId}
                  refreshFunction={refreshFunction}
                />
              </div>
            )
        )}
      {/* <SingleComement postId={videoId.videoId} /> */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={CommentValue}
          placeholder="작성하라"
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          제출
        </button>
      </form>
    </div>
  );
}

export default Comment;
