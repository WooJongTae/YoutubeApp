import axios from "axios";
import React, { useEffect, useState } from "react";

function SideVideo() {
  const [SideVideo, setSideVideo] = useState([]);

  useEffect(() => {
    axios.get("/api/video/getVideos").then((res) => {
      if (res.data.success) {
        console.log(res.data.videos);
        setSideVideo(res.data.videos);
      } else {
        alert("비디오 가져오기를 실패했습니다.");
      }
    });
  }, []);

  const renderSideVideo = SideVideo.map((video, index) => {
    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration - minutes * 60);
    return (
      <div
        key={index}
        style={{ display: "flex", marginBottom: "1rem", padding: "0 2rem" }}
      >
        <div style={{ width: "40%", marginBottom: "1rem" }}>
          <a href="">
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="사이드 비디오"
            />
          </a>
        </div>
        <div style={{ width: "50%" }}>
          <a href>
            <span style={{ fontSize: "1rem", color: "black" }}>
              {video.title}
            </span>
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views}</span>
            <br />
            <span>
              {minutes}: {seconds}
            </span>
            <br />
          </a>
        </div>
      </div>
    );
  });
  return <div>{SideVideo ? renderSideVideo : <div>Loading....</div>};</div>;
}

export default SideVideo;
