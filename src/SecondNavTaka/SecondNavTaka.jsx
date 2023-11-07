
import { NavLink, Outlet } from 'react-router-dom';
import classes from './SecondNavTaka.module.css';
export default function SecondNav(){
    return(
        <div className={classes.allMain}>
        <div className={classes.navMain}>
          <NavLink className={classes.all} to='singleDataShow'>
            <div>ALL</div>
          </NavLink>
          <NavLink className={classes.all} to='DayRander'>
            <div>DAY</div>
          </NavLink>
          <NavLink className={classes.all} to='Mounth'>
            <div>MOUNTH</div>
          </NavLink>
          <NavLink className={classes.all} to="OfficeTaka">
            <div>OFFICE</div>
          </NavLink>
        </div>
        <Outlet />
      </div>
    );

}