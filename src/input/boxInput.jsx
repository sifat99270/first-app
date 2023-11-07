
import classes from './boxInput.module.css';
// eslint-disable-next-line react/prop-types
export default function BoxInput({i,...rest}){


    return(
      <div className={classes.input}>
      <input required {...rest} />
    <div className={classes.try}><i className={i}></i></div>
    </div>
    )
}