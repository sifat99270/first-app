import { useEffect } from "react";
import classes from "./Picture.module.css";
export default function Picture() {
  useEffect(() => {
    const boxs = document.querySelectorAll(`.${classes.observe}`);

    const objerve = new IntersectionObserver((items) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          item.target.classList.add(`${classes.classAdd}`);
        } else {
          item.target.classList.remove(`${classes.classAdd}`);
        }
      });
    });
    boxs.forEach((item) => {
      objerve.observe(item);
    });
  });

  function king(el) {
    el.target.nextElementSibling.classList.toggle(`${classes.seeAbout}`);
  }
  return (
    <div className={classes.slideMain}>
      <div id="1" className={classes.observe}>
        <img
          src={`${
            import.meta.env.VITE_SERVER_URL
          }/images/uploads/avatars/kader1.jpg`}
        />
        <div onClick={king} className={classes.slideButton}>
          see more
        </div>
        <div className={classes.slideAbout}>
          He Is A Contractor.His Home Is Chilahati.He Is A Very Good Person.
        </div>
      </div>
      <div className={classes.observe}>
        <img
          src={`${
            import.meta.env.VITE_SERVER_URL
          }/images/uploads/avatars/sifat.jpg`}
        />
        <div onClick={king} className={classes.slideButton}>
          see more
        </div>
        <div className={classes.slideAbout}>
          He Is An Accountant.He Is A Common Man.His Behavior Is Very Nice.He Is
          A Very Good Person
        </div>
      </div>
      <div className={classes.observe}>
        <img
          src={`${
            import.meta.env.VITE_SERVER_URL
          }/images/uploads/avatars/kader.jpg`}
        />
        <div onClick={king} className={classes.slideButton}>
          see more
        </div>
        <div className={classes.slideAbout}>
          He Is A Contractor.His Home Is Chilahati.He Is A Very Good Person.
        </div>
      </div>
      <div className={classes.observe}>
        <img
          src={`${
            import.meta.env.VITE_SERVER_URL
          }/images/uploads/avatars/sifat.jpg`}
        />
        <div onClick={king} className={classes.slideButton}>
          see more
        </div>
        <div className={classes.slideAbout}>
          He Is An Accountant.He Is A Common Man.His Behavior Is Very Nice.He Is
          A Very Good Person
        </div>
      </div>
      <div className={classes.observe}>
        <img
          src={`${
            import.meta.env.VITE_SERVER_URL
          }/images/uploads/avatars/sifat1.jpg`}
        />
        <div onClick={king} className={classes.slideButton}>
          see more
        </div>
        <div className={classes.slideAbout}>
          He Is A Webdevloper.His Home Is Chilahati.
        </div>
      </div>
    </div>
  );
}
