import { useEffect } from "react";
import classes from "./Contact.module.css";
export default function Contact() {
  useEffect(() => {});
  return (
    <div className={classes.contactMain}>
      <h4>CONTACT US</h4>
      <div className={classes.contact}>
        <a href="mailto:rasifat33@gmail.com" className={classes.a}>
          <div className={classes.contactIcon}>
            <i className="fa-brands fa-square-whatsapp"></i>
          </div>
          <span>WHATSAPP </span>
        </a>
        <a
          href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwa.me%2Fqr%2F6BUSYMNMMWEND1%3Ffbclid%3DIwAR0v31-Fmv0JaBBQgul9RmXmbqaOTQ9mQRLG1tbHoQwez8nUErX8jJSZudU&h=AT3SRAN8GwEgGKZGdDrLNYQkoNVEYdCViLAdNkL9-Bh7az0Yrxs3OY7UCmQOfoZeRsyqWOn0jzNAdwQMHcpLpGVT6OxJvh6lbjx6eLxmm0LF36IY63hBU9jXviXgwr1oBpB3LoP1rPfFKmrElP-fNA"
          className={classes.a}
        >
          <div className={classes.contactIcon}>
            <i className="fa-brands fa-whatsapp"></i>
          </div>
          <span>WHATSAPP</span>
        </a>
        <a href="tel:+8801302139673" className={classes.a}>
          <div className={classes.contactIcon}>
            <i className="fa-solid fa-phone"></i>
          </div>
          <span>PHONE</span>
        </a>
        <a
          href="https://www.facebook.com/sifat.islam.9883739?mibextid=ZbWKwL"
          className={classes.a}
        >
          <div className={classes.contactIcon}>
            <i className="fa-brands fa-facebook"></i>
          </div>
          <span>FACEBOOK</span>
        </a>
      </div>
    </div>
  );
}
