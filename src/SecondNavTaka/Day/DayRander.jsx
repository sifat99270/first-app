import Loading from "../../Loading/loading";
import { useAuthServer } from "../../auth/myServerAuthContext";
import Day from "./Day";

// eslint-disable-next-line react/prop-types
export default function DayRander() {
  const { dayData, loading } = useAuthServer();
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
