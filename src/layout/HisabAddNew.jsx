import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import HisabAddForm1 from "./HisabAddForm1";
import classes from "./HisabAddNew.module.css";
// eslint-disable-next-line react/prop-types
export default function HisabAddNew({ active }) {
  const [takaAdd, setTakaAdd] = useState(false);
  const arrowRef = useRef();
  const addRef = useRef();
  function Slide() {
    arrowRef.current.classList.toggle(`${classes.arrowRotate}`);
    addRef.current.classList.toggle(`${classes.addClass}`);
    if (addRef.current.classList.contains(`${classes.addClass}`)) {
      active(true);
    } else {
      active(false);
    }
  }
  return (
    <div ref={addRef} className={classes.add}>
      <div className={classes.addTaka}>
        <NavLink
          onClick={() => {
            setTakaAdd(true);
          }}
          className={classes.a}
        >
          <div className={classes.text}>TAKA ADD</div>
        </NavLink>
        <NavLink
          onClick={() => {
            setTakaAdd(false);
          }}
          className={classes.a}
        >
          <div className={classes.text}>KHORAJ ADD</div>
        </NavLink>
      </div>
      <HisabAddForm1 takaAdd={takaAdd} />
      <div className={classes.arrow}>
        <i
          ref={arrowRef}
          onClick={Slide}
          className="fa-solid fa-circle-arrow-left"
        ></i>
      </div>
    </div>
  );
}
