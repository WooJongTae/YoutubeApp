import React, { useEffect, useState } from "react";
import { Row, Col, Avatar } from "antd";
import { Meta } from "antd/es/list/Item";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
function SubscriptionPage() {
  const [Video, setVideo] = useState([]);
  const subscriptionVariables = {
    userFrom: JSON.parse(localStorage.getItem("loginSuccess")).userId,
  };
  console.log(Video);
  useEffect(() => {
    axios
      .post("/api/getSubscriptionVideos", subscriptionVariables)
      .then((res) => {
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

export default SubscriptionPage;
