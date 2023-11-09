/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
//import { useAuthServer } from "../auth/myServerAuthContext";
import classes from "./modelHisab.module.css";
import { useAuthServer } from "../auth/myServerAuthContext";
// eslint-disable-next-line react/prop-types
export default function ModelHisab({
  name,
  taka,
  time,
  updateId,
  office,
  index,
}) {
  const [active, setActive] = useState(false);
  const updateRef = useRef();
  const clickRef = useRef();
  //const { currentUser } = useAuthServer();
  const [inputName, setInputName] = useState("");
  const [inputTaka, setInputTaka] = useState("");
  const [error, setError] = useState("");
  const { socket } = useAuthServer();
  //const uid = currentUser.id;

  if (error) {
    console.log(error);
  }
  useEffect(() => {
    if (active) {
      updateRef.current.classList.add(`${classes.king}`);
    } else {
      updateRef.current.classList.remove(`${classes.king}`);
    }
  });
  async function DataUpdate(e) {
    e.preventDefault();
    if (inputName === "" && inputTaka === "") {
      alert("Please FillUp Input");
    } else {
      try {
        setError("");
        if (!office) {
          const update = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/takaAddAndGet`,
            {
              method: "PUT",
              body: JSON.stringify({
                id: updateId,
                name: inputName,
                taka: inputTaka,
              }),
              headers: {
                "content-type": "application/json",
              },
            }
          );
          const upateResult = await update.json();
          if (upateResult.message) {
            socket.emit("dayUpdate", {
              name: inputName,
              taka: inputTaka,
              index,
            });
            setInputName("");
            setInputTaka("");
          }
        } else {
          const update = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/takaAddAndGet/office`,
            {
              method: "PUT",
              body: JSON.stringify({
                id: updateId,
                name: inputName,
                taka: inputTaka,
              }),
              headers: {
                "content-type": "application/json",
              },
            }
          );
          const upateResult = await update.json();
          if (upateResult.message) {
            socket.emit("officeUpdate", {
              name: inputName,
              taka: inputTaka,
              index,
            });
            setInputName("");
            setInputTaka("");
          }
        }
      } catch (err) {
        setError(err);
      }
    }
  }
  async function DataDelete() {
    const confrim = window.confirm("DO YOU WANT TO DELETE THIS DATA");
    if (confrim) {
      try {
        setError("");
        if (office) {
          const deletes = await fetch(
            `${
              import.meta.env.VITE_SERVER_URL
            }/takaAddAndGet/office/${updateId}`,
            {
              method: "DELETE",
              headers: {
                "content-type": "application/json",
              },
            }
          );
          const deletesResult = await deletes.json();
          if (deletesResult.message) {
            socket.emit("officeDelete", { index });
          }
        } else {
          const deletes = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/takaAddAndGet`,
            {
              method: "DELETE",
              body: JSON.stringify({
                id: updateId,
              }),
              headers: {
                "content-type": "application/json",
              },
            }
          );
          const deletesResult = await deletes.json();
          if (deletesResult.message) {
            socket.emit("dayDelete", { index });
          }
        }
      } catch (err) {
        setError(err);
      }
    } else {
      //
    }
  }
  return (
    <div ref={clickRef} className={classes.main}>
      <div className={classes.left}>
        <span className={classes.span1}>{name}</span>
        <span className={classes.span2}>date:{time}</span>
      </div>
      <div className={classes.right}>{taka}</div>
      <div className={classes.updateMain}>
        <div className={classes.flex}>
          <div onClick={DataDelete} className={classes.delete}>
            DELETE
          </div>
          <div
            onClick={() => {
              if (!active) {
                setActive(true);
              } else {
                setActive(false);
              }
            }}
            className={classes.update}
          >
            UPDATE
          </div>
        </div>
        <form
          onSubmit={DataUpdate}
          ref={updateRef}
          className={classes.updateForm}
        >
          <div className={classes.input1}>
            <input
              type="text"
              required
              className={classes.updateInput}
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
              }}
            />
            <div className={classes.top}>NAME</div>
          </div>
          <div className={classes.input1}>
            <input
              type="number"
              required
              className={classes.updateInput}
              value={inputTaka}
              onChange={(e) => {
                setInputTaka(e.target.value);
              }}
            />
            <div className={classes.top}>TAKA</div>
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
}
