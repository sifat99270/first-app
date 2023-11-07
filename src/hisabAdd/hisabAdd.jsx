import HisabInput from "../input/hisabInput";
import classes from './hisabAdd.module.css'
export default function HisabAdd(){


    return(
        <>
        <div className={classes.main}>
      <div className={classes.round}>
        <HisabInput />
        <HisabInput />
      </div>
      <button>ADD TAKA</button>
    </div>
        </>
    )
}