import { useState, useEffect } from "react";
import { useAuthServer } from "../../auth/myServerAuthContext";
import SingleMounth from "./SingleMounth";

export default function Mounth() {
  const { currentUser } = useAuthServer();
  const [mounthData, setMounthData] = useState([]);
  useEffect(() => {
    async function autoCall() {
      if (currentUser) {
        await fetch(
          `${import.meta.env.VITE_SERVER_URL}/takaAddAndGet/mounth/${
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
            setMounthData(data);
          });
      } else {
        setMounthData([]);
      }
    }
    autoCall();
  }, [currentUser]);

  return (
    <>
      {mounthData.error ? (
        <p>{mounthData.error}</p>
      ) : (
        mounthData.map((item) => {
          return (
            <SingleMounth
              key={item._id}
              data={item.mounths}
              date={item.mounth}
            />
          );
        })
      )}
    </>
  );
}
