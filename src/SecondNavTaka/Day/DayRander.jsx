import Loading from "../../Loading/loading";
import { useAuthServer } from "../../auth/myServerAuthContext";
import Day from "./Day";
import { useEffect, useState } from "react";
// eslint-disable-next-line react/prop-types
export default function DayRander() {
  const { currentUser, loading } = useAuthServer();
  const [dayData, setDayData] = useState([]);
  useEffect(() => {
    async function callDay() {
      if (currentUser) {
        const day = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/takaAddAndGet/day/${
            currentUser.id
          }`,
          {
            method: "GET",
          }
        );
        const setDay = await day.json();
        setDayData(setDay);
      } else {
        setDayData([]);
      }
    }
    callDay();
  }, [currentUser]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : dayData.error ? (
        <p>{dayData.error}</p>
      ) : (
        dayData.map((item) => {
          return <Day date={item.date} data={item.dates} key={item._id} />;
        })
      )}
    </>
  );
}
