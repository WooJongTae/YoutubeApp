import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleComement from "../SingleComement/SingleComement";
function Comment({ CommentLists, postId }) {
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
        CommentLists.map((comment, index) => (
          <SingleComement comment={comment} postId={videoId} />
        ))}
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
