import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../Loading/loading";
import { useAuthServer } from "../auth/myServerAuthContext";
import BoxInput from "../input/boxInput";
import classes from "./signIn.module.css";

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
  async function handleSubmit(e) {
    e.preventDefault();
    const form = document.querySelector(".form");
    const formData = new FormData(form);
    console.log(formData);
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
            setLoading(false);
            return setError(siginResult.email.msg);
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
          setError("FAIL TO CREATE AN ACCOUNT");
        }
      }
    } else {
      return setError("name only 8 caracter");
    }
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
          <BoxInput
            type="password"
            placeholder="Enter Password"
            i="fa-solid fa-lock"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
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
          <button name="button" disabled={loading} type="submit">
            SIGNIN
          </button>
        </form>
      )}
      <div className={classes.link}>
        <h4>Dont Have Any Account?</h4>
        <NavLink to="/login">Login</NavLink>
      </div>
      {error && <div>{error}</div>}
    </>
  );
}
