import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import UserHome from "./routes/user/HomePage";
import UserLogin from "./routes/user/LoginPage";
import UserVerticals from "./routes/user/VerticalsPage";
import UserCourses from "./routes/user/CoursesPage";
import UserUnits from "./routes/user/UnitsPage";
import UserSingleUnit from "./routes/user/SingleUnitPage";
import UserResetPass from "./routes/user/ResetPassPage";
import UserRegis from "./routes/user/RegisPage";
import UserQuiz from "./routes/user/QuizPage";

import AdminLogin from "./routes/admin/LoginPage";
import AdminServices from "./routes/admin/ServicesPage";
import AdminVerticals from "./routes/admin/VerticalsPage";
import AdminCourses from "./routes/admin/CoursesPage.jsx";
import AdminUnits from "./routes/admin/UnitsPage";
import AdminAddUnit from "./routes/admin/AddUnitPage";

import "./App.css";

function UserApp() {
  return (
    <Routes>
      <Route exact path="/user/login" element={<UserLogin />} />{" "}
      <Route exact path="/" element={<UserHome />} />
      <Route exact path="/user/verticals/all" element={<UserVerticals />} />
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
      <Route exact path="/user/reset-password" element={<UserResetPass />} />
      <Route exact path="/user/register" element={<UserRegis />} />{" "}
    </Routes>
  );
}

function AdminApp() {
  return (
    <Routes>
      <Route exact path="/admin/courses" element={<AdminCourses />} />
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
        element={<AdminAddUnit />}
      />
    </Routes>
  );
}

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="app-outer-div">
          <UserApp />
          <AdminApp />
        </div>
      </Router>
    </>
  );
}

export default App;
