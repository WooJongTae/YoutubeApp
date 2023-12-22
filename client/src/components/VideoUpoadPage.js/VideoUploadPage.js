import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function VideoUploadPage() {
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const PrivateOptions = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" },
  ];

  const CategoryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Aouto & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" },
  ];

  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Cartegory, setCartegory] = useState("Film & Animation");
  const [Duration, setDuration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");
  const [FilePath, setFilePath] = useState("");

  console.log(ThumbnailPath);
  const onTitleChange = (e) => {
    setVideoTitle(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onPrivateChange = (e) => {
    setPrivate(e.target.value);
  };

  const onCategoryChange = (e) => {
    setCartegory(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      privacy: Private,
      filePath: FilePath,
      category: Cartegory,
      duration: Duration,
      thumbnail: FilePath,
    };

    axios.post("/api/video/uploadVideo", variables).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        message.success("성공했습니다");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        alert("비디오 업로드에 실패했습니다!!");
      }
    });
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    axios.post("/api/video/uploadfiles", formData, config).then((res) => {
      console.log(res);
      if (res.data.success) {
        console.log(res.data);
        let variable = {
          url: res.data.url,
          fileName: res.data.fileName,
        };
        setFilePath(res.data.url);

        axios.post("/api/video/thumbnail", variable).then((res) => {
          if (res.data.success) {
            console.log(res.data);
            setDuration(res.data.fileDuration);
            setThumbnailPath(res.data.thumbsFilePath);
          } else {
            alert("썸내일 생성 실패입니다!");
          }
        });
      } else {
        alert("비디오 업로드 실패!");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1>업로드 비디오</h1>
        <Form onSubmit={onSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Dropzone
              onDrop={onDrop}
              multiple={false}
              maxSize={100000000000000}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <PlusOutlined style={{ fontSize: "3rem" }} />
                </div>
              )}
            </Dropzone>
            {ThumbnailPath && (
              <div>
                <img
                  src={`http://localhost:5000/${ThumbnailPath}`}
                  alt="썸내일"
                />
              </div>
            )}
          </div>
          <br />
          <br />
          <label>제목</label>
          <Input value={VideoTitle} onChange={onTitleChange} />
          <br />
          <br />
          <label>설명</label>
          <TextArea value={Description} onChange={onDescriptionChange} />
          <br />
          <br />
          <select onChange={onPrivateChange}>
            {PrivateOptions.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
          <br />
          <br />
          <select onChange={onCategoryChange}>
            {CategoryOptions.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
          <br />
          <br />
          <Button type="primary" size="large" onClick={onSubmit}>
            제출
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default VideoUploadPage;
