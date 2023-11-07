
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './nav.module.css';
export default function Nav(){
  useEffect(()=>{
    const list=document.querySelectorAll('.list');
    function ChangeIndicator(){
      list.forEach((item)=>{
        item.classList.remove(`${classes.active}`);
        this.classList.add(`${classes.active}`);
      })
    }
    
    list.forEach((item)=>{
     item.addEventListener("click",ChangeIndicator);
    })
 return()=>{
  list.forEach((item)=>{
   item.removeEventListener("click",ChangeIndicator);
   })
 }
  },[])
    return(
        <>
        <div className={classes.mainNav}>
        <ul>
          <li id="a" className={`list  ${classes.active}`}>
          <NavLink to='/secondNavTaka' className={classes.king} >
              <span className={classes.icon}><i className="fa-solid fa-house"></i></span>
              <span className={`${classes.text} ${classes.active}`}>Home</span>
          </NavLink>
          </li>
          <li id="a" className={`list`}>
          <NavLink to='/Vedio' className={classes.king} >
              <span className={classes.icon}
                ><i className="fa-brands fa-youtube"></i></span>
              <span className={classes.text}>vedio</span>
            </NavLink>
          </li>
          <li id="a" className={`list`}>
          <NavLink to='/Message' className={classes.king} >
              <span className={classes.icon}><i className="fa-solid fa-message"></i></span>
              <span className={`${classes.text}`}>message</span>
            </NavLink>
          </li>
          <li className={`list`}>
          <NavLink to='/About' className={classes.king} >
              <span className={classes.icon}><i className="fa-solid fa-address-card"></i></span>
              <span className={classes.text}>About</span>
          </NavLink>
          </li>
          <div className={classes.indicator}></div>
        </ul>
      </div>
        </>
    )
}