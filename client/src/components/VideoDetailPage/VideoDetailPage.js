import { Avatar, Col, List, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideVideo from "./SideVideo/SideVideo";
import Subscribe from "./Subscribe/Subscribe";
import Comment from "./Comment/Comment";

function VideoDetailPage() {
  const videoId = useParams();
  const variable = {
    videoId: videoId.videoId,
  };
  // 14에서 같은거 구독금지하기
  const [VideoDetail, setVideoDetail] = useState([]);
  useEffect(() => {
    axios
      .post("/api/video/getVideo", variable)
      .then((res) => {
        if (res.data.success) {
          setVideoDetail(res.data.videoData);
        } else {
          alert("비디오 가져오기를 실패했습니다.");
        }
      })
      .catch((err) => {
        console.log("에러발생");
      });
  }, []);
  if (VideoDetail.writer) {
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col>
            <div style={{ width: "50%", padding: "3rem 4rem" }}>
              <video
                style={{ width: "100%" }}
                src={`http://localhost:5000/${VideoDetail.filePath}`}
                controls
              />
              <List.Item
                actions={[
                  <Subscribe
                    // 비디오만든애
                    userTo={VideoDetail.writer._id}
                    // 로그인한애
                    userFrom={
                      JSON.parse(localStorage.getItem("loginSuccess")).userId
                    }
                    videoId={videoId.videoId}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={VideoDetail.writer.image} />}
                  title={VideoDetail.writer.name}
                  description={VideoDetail.writer.description}
                />
              </List.Item>
              <Comment />
            </div>
          </Col>
          <Col lg={6} xs={24}>
            <SideVideo />
          </Col>
        </Row>
      </div>
    );
  } else {
    <div>Loading........</div>;
  }
}

export default VideoDetailPage;
