import { useAuthServer } from "../../auth/myServerAuthContext";
import SingleMounth from "./SingleMounth";

export default function Mounth() {
  const { mounthData } = useAuthServer();
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
