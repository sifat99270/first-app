import { useEffect, useRef, useState } from "react";
import { useAuthServer } from "../auth/myServerAuthContext";
import classes from "./message.module.css";
export default function Message() {
  const { currentUser, socket } = useAuthServer();
  const [search, setSearch] = useState([]);
  const [converSation, setConverSation] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [participent, SetParticipent] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [seeInput, setSeeInput] = useState(false);
  const addUserRef = useRef();
  const plusIconRef = useRef();
  useEffect(() => {
    const addUser = document.querySelector("#addUser");
    const add = document.querySelector("#adds");
    add.addEventListener("click", () => {
      addUser.classList.toggle(`${classes.scale}`);
    });
  }, []);
  useEffect(() => {
    const input = document.querySelector("#input");
    const doneTime = 500;
    let typeingTimer;

    async function timeOutFunction() {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/search`, {
        method: "POST",
        body: JSON.stringify({
          userName: input.value,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      const userData = await res.json();
      setSearch(userData);
    }
    if (input) {
      input.addEventListener("keyup", () => {
        clearTimeout(typeingTimer);
        if (input.value) {
          typeingTimer = setTimeout(timeOutFunction, doneTime);
        } else {
          setSearch([]);
        }
      });
      input.addEventListener("keydown", () => {
        clearTimeout(typeingTimer);
      });
    } else {
      //
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      fetch(`${import.meta.env.VITE_SERVER_URL}/converSation/${currentUser.id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setConverSation(data);
        });
    } else {
      setConverSation([]);
    }
  }, [currentUser]);
  function addConversation(item) {
    fetch(`${import.meta.env.VITE_SERVER_URL}/converSation`, {
      method: "POST",
      body: JSON.stringify({
        creator_id: {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar,
        },
        perticipate_id: {
          id: item._id,
          name: item.name,
          avatar: item.avatar,
        },
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        //console.log(data);
      });
  }
  function seeMessage(all) {
    socket.emit("join-room", all._id);
    SetParticipent(all);
    if (all.creator_id.id === currentUser.id) {
      setReceiver(all.perticipate_id);
    } else {
      setReceiver(all.creator_id);
    }

    fetch(`${import.meta.env.VITE_SERVER_URL}/message/${all._id}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          setMessages([]);
        } else {
          setMessages(data);
        }
      });
  }
  function sendMessage() {
    const body = {
      text: input,
      date: new Date().toLocaleDateString(),
      sender: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
      },
      receiver: {
        id: receiver.id,
        name: receiver.name,
        avatar: receiver.avatar,
      },
      conversation_id: participent._id,
    };
    fetch(`${import.meta.env.VITE_SERVER_URL}/message`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        socket.emit("send-message", data);
        setInput("");
        // console.log(data);
      });
  }
  useEffect(() => {
    socket.on("see-message", (data) => {
      setMessages((pre) => {
        return [...pre, data];
      });
    });
  }, [socket]);
  return (
    <div className={classes.main}>
      <div ref={addUserRef} id="addUser" className={classes.addUser}>
        <p>create new conversation</p>
        <input
          id="input"
          className={classes.addInput}
          type="text"
          placeholder="enter name"
        />
        <div className={classes.showUser}>
          {search.map((item) => {
            return (
              <div
                onClick={() => {
                  document.querySelector("#input").value = "";
                  document
                    .querySelector("#addUser")
                    .classList.remove(`${classes.scale}`);
                  addConversation(item);
                  setSearch([]);
                }}
                key={item._id}
                className={classes.user}
              >
                <img
                  className={classes.img}
                  src={`${
                    import.meta.env.VITE_SERVER_URL
                  }/images/uploads/avatars/${item.avatar}`}
                />
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.converSation}>
        <input className={classes.input} type="" placeholder="search" />
        {converSation.length > 0
          ? converSation.map((item) => {
              return (
                <div
                  onClick={() => {
                    setSeeInput(true);
                    setMessages([]);
                    seeMessage(item);
                  }}
                  key={item._id}
                  className={classes.indivisualCon}
                >
                  {currentUser.id === item.creator_id.id ? (
                    <>
                      <img
                        src={`${
                          import.meta.env.VITE_SERVER_URL
                        }/images/uploads/avatars/${item.perticipate_id.avatar}`}
                      />
                      <span> {item.perticipate_id.name} </span>
                    </>
                  ) : (
                    <>
                      <img
                        src={`${
                          import.meta.env.VITE_SERVER_URL
                        }/images/uploads/avatars/${item.creator_id.avatar}`}
                      />
                      <span> {item.creator_id.name}</span>
                    </>
                  )}
                  <i></i>
                </div>
              );
            })
          : false}
        <div ref={plusIconRef} id="adds" className={classes.add}>
          <div className={classes.addIcon}>
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
      <div className={classes.messageAll}>
        <div className={classes.partyName}>
          <span>{receiver.name}</span>
          <span className={classes.delete}>
            <i className="fa-solid fa-trash-can"></i>
          </span>
        </div>
        <div className={classes.message}>
          {messages.map((item) => {
            if (item.receiver.id != receiver.id) {
              return (
                <div key={item._id} className={classes.other}>
                  <img
                    className={classes.img}
                    src={`${
                      import.meta.env.VITE_SERVER_URL
                    }/images/uploads/avatars/${item.sender.avatar}`}
                  />
                  <span className={classes.messageOne}>{item.text}</span>
                  <span className={classes.date}>{item.date} </span>
                </div>
              );
            } else {
              return (
                <div key={item._id} className={classes.creator}>
                  <span className={classes.messageOne}>{item.text}</span>
                  <span className={classes.date}> {item.date} </span>
                </div>
              );
            }
          })}
        </div>
      </div>
      {seeInput ? (
        <div className={classes.write}>
          <input
            required
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="write message"
          />
          <div onClick={sendMessage} className={classes.sendButton}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
