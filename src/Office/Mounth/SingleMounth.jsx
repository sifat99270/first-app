/* eslint-disable react/prop-types */
import ModelHisab from "../../modelHisab/modelHisab";
import classes from "./SingleMounth.module.css";
// eslint-disable-next-line react/prop-types
export default function SingleMounth({ date, data }) {
  return (
    <>
      <div className={classes.dayMain}>
        <div className={classes.dateSeen}>{date}</div>
        <>
          {data.map((item) => {
            return (
              <ModelHisab
                key={item._id}
                time={item.time}
                name={item.name}
                taka={item.taka}
              />
            );
          })}
        </>
      </div>
    </>
  );
}
