import classes from "./Work.module.css";
import { useEffect } from "react";

export default function Work() {
  useEffect(() => {
    const images = document.querySelectorAll(`.${classes.workImg}`);
    const observer = new IntersectionObserver((items) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          item.target.classList.add(`${classes.workImgAdd}`);
        } else {
          item.target.classList.remove(`${classes.workImgAdd}`);
        }
      });
    });

    images.forEach((item) => {
      observer.observe(item);
    });
  }, []);
  useEffect(() => {
    const images = document.querySelectorAll(".img");
    const observer = new IntersectionObserver((items) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          item.target.classList.add(`${classes.imgSlide}`);
        } else {
          item.target.classList.remove(`${classes.imgSlide}`);
        }
      });
    });

    images.forEach((item) => {
      observer.observe(item);
    });
  }, []);
  return (
    <div className={classes.work}>
      <h3>OUR WORK</h3>
      <div className={classes.workFlex}>
        <div className={classes.workImg}>
          <img
            className="img"
            src={`${import.meta.env.VITE_SERVER_URL}/images/uploads/rcc1.jpg`}
          />
          <button className={classes.imgButton}>Read</button>
        </div>
        <div className={classes.workImg}>
          <img
            className="img"
            src={`${import.meta.env.VITE_SERVER_URL}/images/uploads/rcc2.jpg`}
          />
          <button className={classes.imgButton}>Read</button>
        </div>
        <div className={classes.workImg}>
          <img
            className="img"
            src={`${import.meta.env.VITE_SERVER_URL}/images/uploads/rcc3.jpg`}
          />
          <button className={classes.imgButton}>Read</button>
        </div>
        <div className={classes.workImg}>
          <img
            className="img"
            src={`${import.meta.env.VITE_SERVER_URL}/images/uploads/rcc5.jpg`}
          />
          <button className={classes.imgButton}>Read</button>
        </div>
        <div className={classes.workImg}>
          <img
            className="img"
            src={`${import.meta.env.VITE_SERVER_URL}/images/uploads/drain1.jpg`}
          />
          <button className={classes.imgButton}>Read</button>
        </div>
        <div className={classes.workImg}>
          <img
            className="img"
            src={`${import.meta.env.VITE_SERVER_URL}/images/uploads/drain3.jpg`}
          />
          <button className={classes.imgButton}>Read</button>
        </div>
      </div>
    </div>
  );
}
