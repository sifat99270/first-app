import classes from "./Information.module.css";
export default function Information() {
  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.h1}>ABOUT US</h1>
        <h3 className={classes.h3}>MD RIASAD AZIM SIFAT</h3>
        <h2>OUR TEAM</h2>
        <div className={classes.teamMain}>
          <div className={classes.team}>
            <img
              src={`${
                import.meta.env.VITE_SERVER_URL
              }/images/uploads/avatars/kader1.jpg`}
            />
            <span>ABDUL KADER</span>
            <h6>contractor</h6>
          </div>
          <div className={classes.team}>
            <img
              src={`${
                import.meta.env.VITE_SERVER_URL
              }/images/uploads/avatars/sifat.jpg`}
            />
            <span>SIFAT</span>
            <h6>manager</h6>
          </div>
          <div className={classes.team}>
            <img
              src={`${
                import.meta.env.VITE_SERVER_URL
              }/images/uploads/avatars/sifat1.jpg`}
            />
            <span>SIFAT</span>
            <h6>devloper</h6>
          </div>
        </div>
      </div>
    </>
  );
}
