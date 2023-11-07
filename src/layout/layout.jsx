import HisabAddNew from "./HisabAddNew";
import Nav from "./nav";
import classes from "./Layout.module.css";
import { useEffect, useRef, useState } from "react";
import { useAuthServer } from "../auth/myServerAuthContext";
// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  const [active, setActive] = useState(false);
  const { currentUser } = useAuthServer();
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
      <Nav />
      {currentUser && <HisabAddNew active={setActive} />}
      <div ref={transitionRef} className={classes.transition}>
        {children}
      </div>
    </>
  );
}
