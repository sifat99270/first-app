
import classes from './hisabInput.module.css'
export default function HisabInput(){

    return(
        <>
    <div className={classes.input}>
    <input type="text" required />
    <span>HISABAR NAM</span>
    <i></i>
  </div>
        </>
    )
}