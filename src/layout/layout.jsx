import { useEffect, useRef, useState } from "react";
import { useAuthServer } from "../auth/myServerAuthContext";
import HisabAddNew from "./HisabAddNew";
import classes from "./Layout.module.css";
import Nav from "./nav";
// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  const [active, setActive] = useState(false);
  const { currentUser, socket } = useAuthServer();
  const [tost, setTost] = useState("sorry");
  const tostRef = useRef();

  useEffect(() => {
    function callTost() {
      tostRef.current.classList.add(`${classes.tostAdd}`);
    }

    function deleteTost() {
      tostRef.current.classList.remove(`${classes.tostAdd}`);
    }
    socket.on("getTost", (data) => {
      setTost(data);
      callTost();
      setTimeout(deleteTost, 3000);
    });
  }, [socket]);

  const transitionRef = useRef();
  useEffect(() => {
    if (active) {
      transitionRef.current.style.marginTop = "34vh";
    } else if (!active) {
      transitionRef.current.style.marginTop = "0vh";
    }
  });
  return (
    <>
      <div ref={tostRef} className={classes.tost}>
        {tost}
      </div>
      <Nav />
      {currentUser && <HisabAddNew active={setActive} />}
      <div ref={transitionRef} className={classes.transition}>
        {children}
      </div>
    </>
  );
}
