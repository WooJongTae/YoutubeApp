import { Routes, Route } from "react-router-dom";
import "./App.css";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./components/LoginPage/LoginPage";
import Auth from "./hoc/Auth";
import VideoUploadPage from "./components/VideoUpoadPage.js/VideoUploadPage";
import VideoDetailPage from "./components/VideoDetailPage/VideoDetailPage";

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" element={Auth(LoadingPage, null)} />
        <Route path="/register" element={Auth(RegisterPage, false)} />
        <Route path="/login" element={Auth(LoginPage, false)} />
        <Route path="/video/upload" element={Auth(VideoUploadPage, true)} />
        <Route path="/video/:videoId" element={Auth(VideoDetailPage, null)} />
      </Route>
    </Routes>
  );
}

export default App;
