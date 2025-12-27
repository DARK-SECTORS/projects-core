import "./Footer.css";
import { FaTelegram, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-bg"></div>
      
      <div className="footer-content">
        <div className="footer-socials">
          <a href="https://t.me/vvolodon" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaTelegram />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaYoutube />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaTiktok />
          </a>
        </div>

        <p className="footer-email">vavrykivw@gmail.com</p>
      </div>
    </footer>
  );
}

export default Footer;