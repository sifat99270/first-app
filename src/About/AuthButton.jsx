import { NavLink } from "react-router-dom";
import classes from './AuthButton.module.css'
export default function AuthButton(){
   return(
    <div className={classes.AuthButtonMain}>
        <div className={classes.MainAuthButton}>
        <NavLink className={classes.ButtonLogin} to='/login'>LOGIN</NavLink>
        </div>
        <div className={classes.MainSignin}>
        <NavLink className={classes.ButtonSignin} to='/signin'>SIGNIN</NavLink>
        </div>
    </div>
   ) 
}