import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../user_actions/user_actions";

function LoadingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(logoutUser())
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert("로그아웃 성공");
          navigate("/login");
        } else {
          alert("로그아웃 실패");
        }
      })
      .catch((err) => {
        return err;
      });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작페이지</h2>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default LoadingPage;
