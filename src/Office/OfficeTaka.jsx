import { useEffect, useState } from "react";
import { useAuthServer } from "../auth/myServerAuthContext";
import ModelHisab from "../modelHisab/modelHisab";
export default function OfficeTaka() {
  const { currentUser, socket } = useAuthServer();
  const [office, setOffice] = useState([]);
  const [length, setLength] = useState(0);
  useEffect(() => {
    async function call() {
      if (currentUser) {
        fetch(
          `${import.meta.env.VITE_SERVER_URL}/takaAddAndGet/office/${
            currentUser.id
          }`,
          {
            method: "GET",
          }
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setOffice(data);
          });
      } else {
        setOffice([]);
      }
    }
    call();
  }, [currentUser]);

  useEffect(() => {
    setLength(office.length);
  }, [office.length]);
  useEffect(() => {
    socket.on("getOffice", (data) => {
      setOffice((pre) => {
        if (pre.length > 0) {
          return [...pre, data];
        } else {
          return [data];
        }
      });
    });
  }, [socket]);

  useEffect(() => {
    socket.on("getOfficeUpdate", (data) => {
      setOffice((pre) => {
        pre[data.index].name = data.name;
        pre[data.index].taka = data.taka;
        return [...pre];
      });
    });
  }, [socket]);
  useEffect(() => {
    socket.on("getOfficeDelete", (data) => {
      setOffice((pre) => {
        pre.splice(data.index, 1);
        return [...pre];
      });
    });
  }, [socket]);
  return (
    <>
      {length > 0 ? (
        office.map((item, index) => {
          return (
            <ModelHisab
              time={item.time}
              name={item.name}
              taka={item.taka}
              key={item._id}
              updateId={item._id}
              office={true}
              index={index}
            />
          );
        })
      ) : (
        <div>NO DATA FOUND</div>
      )}
    </>
  );
}
