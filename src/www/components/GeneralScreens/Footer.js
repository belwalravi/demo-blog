import React from 'react';
import '../../Css/Footer.css'

const Footer = () => {
    return (
        <div>
            <div>
                <div className="footer">
                </div>
                <div className="copyright">
                    <p className="copyright-blog">© {new Date().getFullYear()} Tech Blogs. All Rights Reserved</p>
                </div>
            </div>
            <div className="cluster-information">
                {process.env.cluster_name ? process.env.cluster_name : "clusterName"}&nbsp;
                {process.env.pod_name ? process.env.pod_name  : "podName"}&nbsp;
                {process.env.pod_zone ? process.env.pod_zone : "podZone"}&nbsp;
            </div>

        </div>
    )
}

export default Footer;
