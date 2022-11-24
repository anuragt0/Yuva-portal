import './App.css';
import Navbar from './components/Navbar';
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Courses from "./components/Courses";
import Videos from './components/Videos';
import VideoPlayer from './components/VideoPlayer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseState from "./context/CourseState";
import Admin from './components/Admin';
import AdminCourses from './components/AdminCourses';
import AdminUsers from './components/AdminUsers';
import AdminVideos from './components/AdminVideos';
import QuizAdmin from './components/QuizAdmin';
import QuizUser from './components/QuizUser';
import Instructions from './components/Instructions';


function App() {
  return (
    <>
        <CourseState>
        <Router>
            <Navbar />
            <div className="container">
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/signup" element={<Signup />} /> 
                <Route exact path="/courses" element={<Courses />} /> 
                <Route exact path="/course/videos" element={<Videos />} /> 
                <Route exact path="/course/video/player" element={<VideoPlayer />} /> 
                <Route exact path="/course/video/player/quiz/instruction" element={<Instructions />} /> 
                <Route exact path="/course/video/player/quiz/start" element={<QuizUser />} /> 
                <Route exact path="/admin" element={<Admin />} /> 
                <Route exact path="/admin/courses" element={<AdminCourses />} /> 
                <Route exact path="/admin/users" element={<AdminUsers />} /> 
                <Route exact path="/admin/courses/videos" element={<AdminVideos />} /> 
                <Route exact path="/admin/courses/videos/quiz" element={<QuizAdmin />} />
                {/* {/* <Route exact path="/profile" element={<UserProfile />} /> */}
                
            </Routes>
            </div>
        </Router>
        </CourseState>
    </>);
}

export default App;
