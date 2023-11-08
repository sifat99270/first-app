import { useEffect, useState } from "react";
//import { io } from "socket.io-client";
import { useAuthServer } from "../auth/myServerAuthContext";
import ModelHisab from "../modelHisab/modelHisab";

export default function SingleDataShow() {
  const [data, setData] = useState([]);
  const { currentUser, socket } = useAuthServer();
  const [length, setLength] = useState(0);
  //const socket = io.connect("http://localhost:5000");

  useEffect(() => {
    setLength(data.length);
  }, [data.length]);
  useEffect(() => {
    async function autoCall() {
      if (currentUser.id) {
        // socket.emit("join-addId");
        const finds = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/takaAddAndGet/${currentUser.id}`
        );
        const mainData = await finds.json();
        if (mainData.message) {
          //
        } else {
          setData(mainData);
        }
      }
    }
    autoCall();
  }, [currentUser.id]);

  useEffect(() => {
    socket.on("get", (dataIo) => {
      setData((pre) => {
        return [...pre, dataIo];
      });
    });
  }, [socket]);
  useEffect(() => {
    socket.on("getDayUpdate", async (datas) => {
      setData((pre) => {
        pre[datas.index].name = datas.name;
        pre[datas.index].taka = datas.taka;
        return [...pre];
      });
    });
  }, [socket]);
  useEffect(() => {
    socket.on("getDayDelete", (datas) => {
      setData((pre) => {
        pre.splice(datas.index, 1);
        return [...pre];
      });
    });
  }, [socket]);
  return (
    <>
      {length > 0 ? (
        data.map((item, index) => {
          return (
            <ModelHisab
              office={false}
              name={item.name}
              taka={item.taka}
              time={item.time}
              updateId={item._id}
              key={item._id}
              index={index}
            />
          );
        })
      ) : (
        <div
          style={{
            fontWeight: 1000,
            width: "100%",
            textAlign: "center",
            color: "red",
          }}
        >
          NO DATA FOUND
        </div>
      )}
    </>
  );
}
