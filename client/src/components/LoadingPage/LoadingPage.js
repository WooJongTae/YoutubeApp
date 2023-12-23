import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "antd/es/skeleton/Title";
import { Row, Col, Avatar } from "antd";
import { Meta } from "antd/es/list/Item";
import moment from "moment";
import { Link } from "react-router-dom";

function LoadingPage() {
  const [Video, setVideo] = useState([]);
  useEffect(() => {
    axios.get("/api/video/getVideos").then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setVideo(res.data.videos);
      } else {
        alert("비디오 가져오기 실패");
      }
    });
  }, []);

  const renderCards = Video.map((video, index) => {
    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration - minutes * 60);
    return (
      <Col lg={6} md={8} xs={24}>
        <Link to={`/video/${video._id}`}></Link>
        <a href={`/video/${video._id}`}>
          <div style={{ position: "relative" }}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
            />
            <div className="duration">
              <span>
                {minutes}: {seconds}
              </span>
            </div>
          </div>
        </a>
        <br />
        <Meta
          description=""
          title={video.title}
          avatar={<Avatar src={video.writer.image} />}
        />
        <span>{video.writer.name}</span>
        <span style={{ marginLeft: "3rem" }}> {video.views}</span>-{" "}
        <span> {moment(video.createdAt).format("MMM Do YY")} </span>
      </Col>
    );
  });
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1 style={{ textAlign: "center" }}>추천</h1>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default LoadingPage;

// const navigate = useNavigate();
// const dispatch = useDispatch();

// const onClickHandler = () => {
//   dispatch(logoutUser())
//     .then((res) => {
//       console.log(res);
//       if (res.data.success) {
//         alert("로그아웃 성공");
//         navigate("/login");
//       } else {
//         alert("로그아웃 실패");
//       }
//     })
//     .catch((err) => {
//       return err;
//     });
// };
// return (
//   <div
//     style={{
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       width: "100%",
//       height: "100vh",
//     }}
//   >
//     <h2>시작페이지</h2>
//     <button onClick={onClickHandler}>로그아웃</button>
//   </div>
// );
