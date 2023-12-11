import React from "react";
import "../../Css/NotFound.css"
const Unauthorized = () => (
  <>
    <div className="f" style={{"textAlign":"center","paddingTop":"5vh","paddingBottom":"70vh"}}>
      <div>
        <span>
          UNAUTHORIZED ACCESS
          <p style={{"paddingTop":"10px"}}>You are not logged in. Please log in to access this content.</p><br/>
        </span>
        <a href="/?gcp-iap-mode=GCIP_SIGNOUT" style={{"textDecoration":"none"}}>Login</a>
      </div>
    </div>

  </>

);

export default Unauthorized;