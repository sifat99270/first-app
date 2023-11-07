import { useAuthServer } from "../auth/myServerAuthContext";
import LogOut from "../layout/LogOut";
import classes from "./About.module.css";
import AuthButton from "./AuthButton";
import Contact from "./Contact";
import Information from "./Information";
import Picture from "./Picture";
import Service from "./Service";
import Work from "./Work";
import SlideImg from "./slideImg";
export default function About() {
  const { currentUser } = useAuthServer();
  return (
    <div className={classes.container}>
      <Information />
      <SlideImg />
      <Work />
      <Service />
      <Picture />
      <Contact />
      {currentUser ? <LogOut /> : <AuthButton />}
    </div>
  );
}
