import React from 'react';
import {
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiYoutube,
  FiMapPin,
  FiPhone,
  FiMail
} from 'react-icons/fi';
import { SiVimeo } from 'react-icons/si';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* COLUMN 1 */}
        <div className="footer-col brand-col">
          <img src={logo} alt="Organic Grocery Logo" className="footer-logo" />

          <p className="footer-desc">
            Obrien is the best parts shop of your daily nutritions.
            What kind of nutrition do you need you can get here soluta nobis
          </p>

          <div className="social-links">
            <a href="#"><FiFacebook /></a>
            <a href="#"><FiTwitter /></a>
            <a href="#"><FiLinkedin /></a>
            <a href="#"><FiYoutube /></a>
            <a href="#"><SiVimeo /></a>
          </div>
        </div>

        {/* COLUMN 2 */}
        <div className="footer-col">
          <h4 className="footer-title">Information</h4>

          <ul className="footer-links">
            <li><Link to="#">Our Company</Link></li>
            <li><Link to="#">Contact Us</Link></li>
            <li><Link to="#">Our Services</Link></li>
            <li><Link to="#">Why We?</Link></li>
            <li><Link to="#">Careers</Link></li>
          </ul>
        </div>

        {/* COLUMN 3 */}
        <div className="footer-col">
          <h4 className="footer-title">Quick Links</h4>

          <ul className="footer-links">
            <li><Link to="#">About</Link></li>
            <li><Link to="#">Blog</Link></li>
            <li><Link to="#">Shop</Link></li>
            <li><Link to="#">Cart</Link></li>
            <li><Link to="#">Contact</Link></li>
          </ul>
        </div>

        {/* COLUMN 4 */}
        <div className="footer-col">
          <h4 className="footer-title">Contact & Support</h4>

          <ul className="footer-links">
            <li><Link to="#">Online Support</Link></li>
            <li><Link to="#">Shipping Policy</Link></li>
            <li><Link to="#">Return Policy</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
            <li><Link to="#">Terms of Service</Link></li>
          </ul>
        </div>

        {/* COLUMN 5 */}
        <div className="footer-col contact-info-col">
          <h4 className="footer-title">Get In Touch</h4>

          <div className="contact-details">
            <div className="contact-item">
              <FiMapPin className="contact-icon" />
              <p>123, H2, Road #21, Main City, Your address goes here.</p>
            </div>

            <div className="contact-item">
              <FiPhone className="contact-icon" />
              <p>Phone: 01234 698 785</p>
            </div>

            <div className="contact-item">
              <FiMail className="contact-icon" />
              <p>Email: info@example.com</p>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">

          <p>Copyright © 2020 Organic Grocery. All Rights Reserved.</p>

          <div className="footer-bottom-links">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Use</Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;