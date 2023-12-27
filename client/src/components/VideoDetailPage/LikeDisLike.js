import React, { useEffect, useState } from "react";
import { Avatar, Tooltip } from "antd";
import { Icon } from "@ant-design/compatible";
import axios from "axios";
function LikeDisLike({ videoId, userId, commentId, video }) {
  const [Likes, setLikes] = useState(0);
  const [DisLike, setDisLike] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DisLikeAction, setDisLikeAction] = useState(null);
  // let으로하면안되나 내일 챗질문
  let varialbe = {};
  if (video) {
    varialbe = { videoId, userId };
  } else {
    varialbe = { commentId, userId };
  }
  useEffect(() => {
    axios.post("/api/like/getLikes", varialbe).then((res) => {
      if (res.data.success) {
        console.log(res.data.likes.length);
        setLikes(res.data.likes.length);
        res.data.likes.map((like) => {
          if (like.userId === userId) {
            setLikeAction("Liked");
          }
        });
      } else {
        alert("좋아요 싫어요 오류 발생!");
      }
    });
    axios.post("/api/like/getDisLikes", varialbe).then((res) => {
      if (res.data.success) {
        setDisLike(res.data.disLikes.length);
        res.data.disLikes.map((disLike) => {
          if (disLike.userId === userId) {
            setDisLikeAction("DisLiked");
          }
        });
      } else {
        alert("디스 좋아요 싫어요 오류 발생!");
      }
    });
  }, []);

  const onLike = () => {
    if (LikeAction === null) {
      axios.post("/api/like/upLike", varialbe).then((res) => {
        if (res.data.success) {
          setLikes(Likes + 1);
          setLikeAction("Liked");

          if (DisLikeAction !== null) {
            setDisLikeAction(null);
            setDisLike(DisLike - 1);
          }
        } else {
          alert("Like를 올리지 못했습니다.");
        }
      });
    } else {
      axios.post("/api/like/unLike", varialbe).then((res) => {
        if (res.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          alert("Like를 내리지 못했습니다.");
        }
      });
    }
  };
  const onDisLike = () => {
    if (DisLikeAction !== null) {
      axios.post("/api/like/unDisLike", varialbe).then((res) => {
        if (res.data.success) {
          setDisLike(DisLike - 1);
          setDisLikeAction(null);
        } else {
          alert("dislike 지우기 실패");
        }
      });
    } else {
      axios.post("/api/like/upDisLike", varialbe).then((res) => {
        if (res.data.success) {
          setDisLike(DisLike + 1);
          setDisLikeAction("DisLiked");
          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
          alert("dislike 지우기 실패");
        }
      });
    }
  };
  return (
    <div>
      <span>
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={LikeAction === "Liked" ? "filled" : "outlined"}
            onClick={onLike}
          />
        </Tooltip>
        <span>{Likes}</span>
      </span>
      <div></div>
      <span>
        <Tooltip title="Like">
          <Icon
            type="Dislike"
            theme={DisLikeAction === "DisLiked" ? "filled" : "outlined"}
            onClick={onDisLike}
          />
        </Tooltip>
        <span>{DisLike}</span>
      </span>
    </div>
  );
}

export default LikeDisLike;
