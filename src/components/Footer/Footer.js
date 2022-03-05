import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import "../../styles/Footer.css"

const Footer = () => (
    <footer id="footer" className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <p id="footer_text">
            Created by KMunton<br />
            <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
)

export default Footer;