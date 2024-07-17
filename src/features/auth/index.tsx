import { Outlet } from "react-router-dom";
import classes from "./auth.module.css";
const Auth = () => {
  return (
    <div className={classes.wrapper}>
      <Outlet />
    </div>
  );
};

export default Auth;
