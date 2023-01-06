import "./App.css";
import Navbar from "./components/Navbar";

import UserHome from "./routes/user/UserHome";
import UserLogin from "./routes/user/UserLogin";
import UserVerticals from "./routes/user/UserVerticals";
import UserCourses from "./routes/user/UserCourses";
import UserUnits from "./routes/user/UserUnits";
import UserSingleUnit from "./routes/user/UserSingleUnit";
import UserResetPass from "./routes/user/UserResetPass";
import UserRegis from "./routes/user/UserRegis";
import UserQuiz from "./routes/user/UserQuiz";

import Signup from "./components/Signup";
import Courses from "./components/Courses";
import Videos from "./components/Videos";
import VideoPlayer from "./components/VideoPlayer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseState from "./context/CourseState";

import Admin from "./components/Admin";
// import AdminCourses from "./components/AdminCourses";
import AdminUsers from "./components/AdminUsers";
import AdminVideos from "./components/AdminVideos";
import QuizAdmin from "./components/QuizAdmin";
import QuizUser from "./components/QuizUser";
import Instructions from "./components/Instructions";
import UserProfile from "./components/UserProfile";
import Footer from "./components/Footer";

import AdminLogin from "./routes/admin/AdminLogin";
import AdminServices from "./routes/admin/AdminServices";
import AdminVerticals from "./routes/admin/AdminVerticals";
import AdminCourses from "./routes/admin/AdminCourses.jsx";
import AdminUnits from "./routes/admin/AdminUnits";
import AdminAddUnits from "./routes/admin/AdminAddUnit";

import HomePage from "./testing/home/HomePage";

function App() {
  return (
    <>
      <CourseState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/testing/home" element={<HomePage />} />{" "}
              <Route exact path="/user/login" element={<UserLogin />} />{" "}
              <Route exact path="/user" element={<HomePage />} />
              <Route
                exact
                path="/user/verticals/all"
                element={<UserVerticals />}
              />
              <Route
                exact
                path="/user/verticals/:verticalId/courses/all"
                element={<UserCourses />}
              />
              <Route
                exact
                path="/user/verticals/:verticalId/courses/:courseId/units/all"
                element={<UserUnits />}
              />
              <Route
                exact
                path="/user/verticals/:verticalId/courses/:courseId/units/:unitId"
                element={<UserSingleUnit />}
              />
              <Route
                exact
                path="/user/verticals/:verticalId/courses/:courseId/units/:unitId/quiz"
                element={<UserQuiz />}
              />
              <Route
                exact
                path="/user/reset-password"
                element={<UserResetPass />}
              />
              <Route exact path="/user/register" element={<UserRegis />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/courses" element={<Courses />} />
              <Route exact path="/profile" element={<UserProfile />} />
              <Route exact path="/course/videos" element={<Videos />} />
              <Route
                exact
                path="/course/video/player"
                element={<VideoPlayer />}
              />
              <Route
                exact
                path="/course/video/player/quiz/instruction"
                element={<Instructions />}
              />
              <Route
                exact
                path="/course/video/player/quiz/start"
                element={<QuizUser />}
              />
              <Route exact path="/admin" element={<Admin />} />
              <Route exact path="/admin/courses" element={<AdminCourses />} />
              <Route exact path="/admin/users" element={<AdminUsers />} />
              <Route
                exact
                path="/admin/courses/videos"
                element={<AdminVideos />}
              />
              <Route
                exact
                path="/admin/courses/videos/quiz"
                element={<QuizAdmin />}
              />
              {/* {/* <Route exact path="/profile" element={<UserProfile />} /> */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/services" element={<AdminServices />} />
              <Route path="/admin/verticals/all" element={<AdminVerticals />} />
              <Route
                path="/admin/verticals/:verticalId/courses/all"
                element={<AdminCourses />}
              />
              <Route
                path="/admin/verticals/:verticalId/courses/:courseId/units/all"
                element={<AdminUnits />}
              />
              <Route
                path="/admin/verticals/:verticalId/courses/:courseId/units/add"
                element={<AdminAddUnits />}
              />
            </Routes>
          </div>
          {/* <Footer /> */}
        </Router>
      </CourseState>
    </>
  );
}

export default App;
