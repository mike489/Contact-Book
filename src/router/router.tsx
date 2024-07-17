import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "../features/auth/index";
import SignIn from "../features/auth/sign-in/sign-in";
import ForgotPassword from "../features/auth/forgot-password/forgot-password";
import ResetPassword from "../features/auth/reset-password/reset-password";
import Home from "../features/home/index";
import Navigation from "../features/home/Nav/Navigation";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />}>
          <Route index element={<Navigate to="sign-in" />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
        
          <Route path="/home" element={<Home />} />
        
      </Routes>
    </Router>
  );
};

export default AppRouter;
