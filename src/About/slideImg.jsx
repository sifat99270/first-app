import { useEffect, useRef } from "react";
import classes from "./slideImg.module.css";
export default function SlideImg() {
  const slideRef = useRef();
  let counter = 0;
  let interVal;
  useEffect(() => {
    const boxs = document.querySelectorAll(".box");
    boxs.forEach((item, inde) => {
      item.style.left = `${inde * 100}%`;
    });
  });
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    interVal = setInterval(next, 2000);

    return () => {
      clearInterval(interVal);
    };
  });

  function next() {
    counter--;
    const boxs = document.querySelectorAll(".box");
    function slide() {
      boxs.forEach((item) => {
        item.style.transform = `translateX(${counter * 100}%)`;
      });
    }
    if (counter === -boxs.length) {
      counter = 0;
      slide();
    } else {
      slide();
    }
  }
  function previous() {
    clearInterval(interVal);
    counter++;
    const boxs = document.querySelectorAll(".box");
    function slide() {
      boxs.forEach((item) => {
        item.style.transform = `translateX(-${counter * 100}%)`;
      });
    }
    if (counter === boxs.length) {
      counter = 0;
      slide();
    } else {
      slide();
    }
  }
  function next1() {
    clearInterval(interVal);
    counter--;
    const boxs = document.querySelectorAll(".box");
    function slide() {
      interVal = setInterval(next, 2000);
      boxs.forEach((item) => {
        item.style.transform = `translateX(${counter * 100}%)`;
      });
    }
    if (counter === -boxs.length) {
      counter = 0;
      slide();
    } else {
      slide();
    }
  }
  return (
    <div className={`${classes.imgSlide}`}>
      <div onClick={previous} className={classes.prev}>
        <i className="fa-solid fa-chevron-left"></i>
      </div>
      <div onClick={next1} className={classes.next}>
        <i className="fa-solid fa-chevron-right"></i>
      </div>

      <div ref={slideRef} className={`${classes.imgFlex} king`}>
        <div className={`${classes.slideImg} box`}>
          <img
            src={`${
              import.meta.env.VITE_SERVER_URL
            }/images/uploads/avatars/kader.jpg`}
          />
        </div>
        <div ref={slideRef} className={`${classes.slideImg} box`}>
          <img
            src={`${
              import.meta.env.VITE_SERVER_URL
            }/images/uploads/avatars/sifat.jpg`}
          />
        </div>
        <div ref={slideRef} className={`${classes.slideImg} box`}>
          <img
            src={`${
              import.meta.env.VITE_SERVER_URL
            }/images/uploads/avatars/sifat1.jpg`}
          />
        </div>
      </div>
    </div>
  );
}
