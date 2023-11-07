import classes from "./Service.module.css";
export default function Service() {
  return (
    <div className={classes.servicePage}>
      <h3>OUR SERVICES</h3>
      <div className={classes.serviceFlex}>
        <div className={classes.skw} style={{ "--clr": "#89ec5b" }}>
          <div className={classes.service} style={{ "--clr": "#89ec5b" }}>
            <div className={classes.icon} style={{ "--clr": "#89ec5b" }}>
              <i className="fa-solid fa-file-signature"></i>
            </div>
            <h4>CONTRACTOR</h4>
            <div className={classes.write}>
              {" "}
              All Road Works Are Contracted.It Is Taken At A Cheap Price.Work Is
              Done Here By Experienced Masons.
            </div>
          </div>
        </div>
        <div className={classes.skw} style={{ "--clr": "#eb5ae5" }}>
          <div className={classes.service} style={{ "--clr": "#eb5ae5" }}>
            <div className={classes.icon} style={{ "--clr": "#eb5ae5" }}>
              <i className="fa-solid fa-user-nurse"></i>
            </div>
            <h4>LABOUR</h4>
            <div className={classes.write}>
              Here labor Is Employed And Rated The Highest.All Types Of Labor
              Are Taken.
            </div>
          </div>
        </div>
        <div className={classes.skw} style={{ "--clr": "#5b98eb" }}>
          <div className={classes.service} style={{ "--clr": "#5b98eb" }}>
            <div className={classes.icon} style={{ "--clr": "#5b98eb" }}>
              <i className="fa-solid fa-road"></i>
            </div>
            <h4>ROAD</h4>
            <div className={classes.write}>
              Its Has The Most Road Works.Work Is Done Here By Experienced
              Masons.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
