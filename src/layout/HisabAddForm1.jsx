import { useEffect, useState } from "react";
import { useAuthServer } from "../auth/myServerAuthContext";
import classes from "./HisabAddForm.module.css";

// eslint-disable-next-line react/prop-types
export default function HisabAddForm1({ takaAdd }) {
  const [name, setName] = useState("");
  const [taka, setTaka] = useState("");
  const { currentUser, socket } = useAuthServer();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      socket.emit("join-id", currentUser.id);
    }
  }, [currentUser, socket]);
  async function PushData(e) {
    const all = new Date();
    const mounth = all.getMonth();
    const date = all.toLocaleDateString();
    const time = all.toLocaleTimeString();
    e.preventDefault();
    setLoading(true);
    const body = {
      id: currentUser.id,
      mounth: mounth,
      name: name,
      taka: taka,
      date: date,
      time: time,
    };
    try {
      if (takaAdd) {
        fetch(`${import.meta.env.VITE_SERVER_URL}/takaAddAndGet/office`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => {
            return res.json();
          })
          .then(async (data) => {
            setName("");
            setTaka("");
            setLoading(false);
            // eslint-disable-next-line react/prop-types
            await socket.emit("addOffice", data);
          });
      } else {
        setLoading(true);
        fetch(`${import.meta.env.VITE_SERVER_URL}/takaAddAndGet`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => {
            return res.json();
          })
          .then(async (data) => {
            setLoading(false);
            setName("");
            setTaka("");
            await socket.emit("add", data);
          });
      }
    } catch (err) {
      setLoading(false);
      alert("there was a problem");
    }
  }
  function Reset() {
    setName("");
    setTaka("");
  }
  return (
    <>
      <form onSubmit={PushData} className={classes.form}>
        <div>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div>NAME</div>
        </div>
        <div>
          <input
            type="number"
            required
            value={taka}
            onChange={(e) => {
              setTaka(e.target.value);
            }}
          />
          <div>TAKA</div>
        </div>
        <button disabled={loading} type="submit">
          {takaAdd ? "TAKA ADD" : "KHORAJ ADD"}
        </button>
        <button type="reset" onClick={Reset}>
          RESET
        </button>
      </form>
    </>
  );
}
