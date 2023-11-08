import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthServer } from "../auth/myServerAuthContext";
import BoxInput from "../input/boxInput";
import classes from "./login.module.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { Login } = useAuthServer();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    // const form = document.querySelector("#form");
    // const formData = new FormData(form);
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const get = await Login(email, password);
      setLoading(false);
      if (get.email) {
        navigate("/", { puse: true });
      } else {
        setError(get);
      }
    } catch (err) {
      setLoading(false);
      setError("FAIL TO LOGIN");
    }
  }
  return (
    <>
      <form
        id="form"
        accessKey="http://localhost:5000/user/login"
        method="post"
        className={classes.form1}
        onSubmit={handleSubmit}
      >
        <h2>LOGIN</h2>
        <BoxInput
          type="email"
          placeholder="Ente Email"
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
        <button disabled={loading} type="submit">
          LOGIN
        </button>
      </form>
      <div className={classes.link}>
        <h4>Dont Have Any Account?</h4>
        <NavLink to="/signIn">SignIn</NavLink>
      </div>
      {error && <div className={classes.seeErr}>{error}</div>}
    </>
  );
}
