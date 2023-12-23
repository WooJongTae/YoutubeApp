import { Avatar, Col, List, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VideoDetailPage() {
  const videoId = useParams();
  const variable = {
    videoId: videoId.videoId,
  };

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
            <div style={{ width: "100%", padding: "3rem 4rem" }}>
              <video
                style={{ width: "100%" }}
                src={`http://localhost:5000/${VideoDetail.filePath}`}
                controls
              />
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={VideoDetail.writer.image} />}
                  title={VideoDetail.writer.name}
                  description={VideoDetail.writer.description}
                />
              </List.Item>
            </div>
          </Col>
          <Col lg={6} xs={24}>
            사이드임!
          </Col>
        </Row>
      </div>
    );
  } else {
    <div>Loading........</div>;
  }
}

export default VideoDetailPage;
