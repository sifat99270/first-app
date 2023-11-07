/* eslint-disable react/prop-types */
import ModelHisab from "../../modelHisab/modelHisab";
import classes from "./Day.module.css";
// eslint-disable-next-line react/prop-types
export default function Day({ data, date }) {
  return (
    <div className={classes.dayMain}>
      <div className={classes.dateSeen}>{date}</div>
      {data.map((item) => {
        return (
          <ModelHisab
            time={item.time}
            name={item.name}
            taka={item.taka}
            key={item._id}
            office={false}
          />
        );
      })}
    </div>
  );
}
