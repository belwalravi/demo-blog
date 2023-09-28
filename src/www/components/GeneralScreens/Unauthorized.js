import React from "react";
import "../../Css/NotFound.css"
const Unauthorized = () => (
  <>
    <div className="f" style={{"textAlign":"center","padding-top":"5vh","padding-bottom":"70vh"}}>
      <div>
        <span>
          UNAUTHORIZED ACCESS
        </span>
        <br/>
        <a href="/?gcp-iap-mode=GCIP_SIGNOUT" style={{"text-decoration":"none"}}>Login</a>
      </div>
    </div>

  </>

);

export default Unauthorized;