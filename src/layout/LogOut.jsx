import { useNavigate } from "react-router-dom";
import { useAuthServer } from "../auth/myServerAuthContext";
import classes from "./LogOut.module.css";
export default function LogOut() {
  const { currentUser, Logout } = useAuthServer();
  const navigate = useNavigate();
  function signOut() {
    Logout();
    navigate("/login", { puse: true });
  }
  return (
    <>
      {" "}
      <div className={classes.fixed}>
        <div onClick={signOut} className={classes.mainLogout}>
          <div className={classes.logOutIcon}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <div className={classes.logOutText}>LOGOUT</div>
          </div>
        </div>

        <div className={classes.displayName}>
          <i className="fa-solid fa-user"></i>
          <div className={classes.name}>{currentUser.name}</div>
        </div>
      </div>
    </>
  );
}
