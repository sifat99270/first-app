import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthServer } from "../auth/myServerAuthContext";
import BoxInput from "../input/boxInput";
import classes from "./signIn.module.css";
//import Loading from "../Loading/Loading";
export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrim, setConfrim] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const formRef = useRef();
  const { SignIn } = useAuthServer();
  const navigate = useNavigate();
  let emailRef = useRef();
  useEffect(() => {}, []);
  async function handleSubmit(e) {
    e.preventDefault();
    const form = document.querySelector(".form");
    const removeClass = document.getElementsByName("name");
    removeClass.forEach((item) => {
      if (item.classList.contains(`${classes.red}`)) {
        item.classList.remove(`${classes.red}`);
        item.parentElement.nextElementSibling.classList.remove(
          `${classes.errClass}`
        );
      }
    });
    const formData = new FormData(form);
    if (name.length <= 8) {
      if (password !== confrim) {
        return setError("PASSWORD DONT MATCH");
      } else {
        try {
          setError("");
          setLoading(true);
          const siginResult = await SignIn(formData);
          if (siginResult.id && siginResult.email) {
            setError("");
            setLoading(false);
            navigate("/", { puse: true });
          } else {
            setEmail("");
            setFile("");
            setName("");
            setPassword("");
            setConfrim("");
            setLoading(false);
            setError("");
            const keyObj = Object.keys(siginResult);
            keyObj.forEach((item) => {
              let a = document.getElementsByName(item);
              a.forEach((item1) => {
                item1.classList.add(`${classes.red}`);
                item1.parentElement.nextElementSibling.innerHTML =
                  siginResult[item].msg;
                item1.parentElement.nextElementSibling.classList.add(
                  `${classes.errClass}`
                );
              });
            });
          }
        } catch (err) {
          setLoading(false);
          setError("FAIL TO CREATE AN ACCOUNT");
        }
      }
    } else {
      setLoading(false);
      return setError("name only 8 caracter");
    }
  }
  return (
    <>
      <form
        action="http://localhost:5000/user"
        method="post"
        encType="multipart/form-data"
        ref={formRef}
        className={`${classes.form1} form`}
        onSubmit={handleSubmit}
      >
        <h2>SIGNIN</h2>
        <BoxInput
          name="name"
          type="text"
          placeholder="Enter Name"
          i="fa-solid fa-user"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div className={classes.err}>hi gooo</div>
        <BoxInput
          name="email"
          type="email"
          placeholder="Enter Email"
          i="fa-solid fa-envelope"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div ref={emailRef} className={classes.err}>
          hi
        </div>
        <BoxInput
          name="password"
          type="password"
          placeholder="Enter Password"
          i="fa-solid fa-lock"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className={classes.err}></div>
        <BoxInput
          name="password"
          type="password"
          placeholder="Confrim Password"
          i="fa-solid fa-check"
          value={confrim}
          onChange={(e) => {
            setConfrim(e.target.value);
          }}
        />
        <div className={classes.err}></div>
        <BoxInput
          name="avatar"
          type="file"
          placeholder=""
          i="fa-solid fa-check"
          value={file}
          onChange={(e) => {
            setFile(e.target.value);
          }}
        />
        <div className={classes.err}></div>
        <button name="button" disabled={loading} type="submit">
          SIGNIN
        </button>
      </form>
      <div className={classes.link}>
        <h4>Dont Have Any Account?</h4>
        <NavLink to="/login">Login</NavLink>
      </div>
      {error && <div className={classes.seeErr}>{error}</div>}
    </>
  );
}
