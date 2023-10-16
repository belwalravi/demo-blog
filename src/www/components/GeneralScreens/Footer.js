import React from 'react';
import '../../Css/Footer.css'

const Footer = () => {
    return (
        <div style={{"textAlign": "center"}}>
            <div className="footer">
            </div>
            <div className="copyright">
                <p className="copyright-blog">© {new Date().getFullYear()}, All Rights Reserved</p>
            </div>
            {/* <div className="cluster-info">
                {process.env.CLUSTER_NAME ? process.env.CLUSTER_NAME : "CLUSTER_NAME"} &nbsp;
                {process.env.POD_NAME ? process.env.POD_NAME : "POD_NAME"} &nbsp; 
                {process.env.POD_ZONE ? process.env.POD_ZONE : "POD_ZONE"} &nbsp; 
            </div> */}
        </div>
    )
}

export default Footer;
