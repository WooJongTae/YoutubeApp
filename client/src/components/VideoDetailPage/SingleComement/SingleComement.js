import React, { useState } from "react";
import { Avatar, Tooltip } from "antd";
import { Comment } from "@ant-design/compatible";
import { useSelector } from "react-redux";
import axios from "axios";

function SingleComement({ postId, comment, refreshFunction }) {
  console.log(comment.writer);
  const [OpenReply, setOpenReply] = useState(false);
  const [RepleComment, setRepleComment] = useState("");
  const user = useSelector((state) => state.user.data);
  console.log(user.userData);
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const onHandleChange = (e) => {
    setRepleComment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      content: RepleComment,
      writer: user.userData._id,
      postId: postId.videoId,
      responseTo: comment._id,
    };
    console.log("에러찾자", variable);
    axios.post("/api/comment/saveComment", variable).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        console.log(res.data.result);
        setRepleComment("");
        setOpenReply(false);
        refreshFunction(res.data.result);
      } else {
        alert("댓글 저장하지 못함!");
      }
    });
  };

  const actions = [
    <span onClick={onClickReplyOpen} key="베이직 리플">
      리플 to
    </span>,
  ];
  return (
    <div>
      <Comment
        actions={actions}
        author={comment.writer.name}
        avatar={<Avatar src={comment.writer.image} alt="이미지" />}
        content={<p>{comment.content}</p>}
      />
      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <textarea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandleChange}
            value={RepleComment}
            placeholder="댓글을 작성해주세요!"
          />
          <br />
          <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            댓글제출
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComement;
