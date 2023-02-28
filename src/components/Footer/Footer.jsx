import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-item">
          <h1>Categories</h1>
          <span>Gifts</span>
          <span>Wooden Box</span>
          <span>Kits</span>
          <span>Combos</span>
        </div>
        <div className="footer-item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
        </div>
      </div>

      <div className="footer-item">
        <h1>About</h1>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quo
          cum, maiores architecto hic eligendi laborum expedita saepe fugiat
          doloremque voluptatem veniam dolorum error vero unde amet? Porro, in
          optio.
        </span>
      </div>
      <div className="footer-item">
        <h1>Contact</h1>
        <span>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum
          culpa possimus tempora libero, nobis optio quam quia nulla molestiae
          tenetur, maiores dignissimos accusamus eum harum in, velit repellendus
          laudantium ratione?
        </span>
      </div>
      <div className="footer-bottom">
        <div className="footer-item">
          <span className="logo">WINES</span>
          {/* <div className="footer-bottom-right"> */}
          <span className="copyright">
            © Copyright 2023. All Rights Reserved
          </span>
        </div>
        <div className="footer-item">
          <img
            className="footer-item-payments"
            src={"/img/payment.png"}
            alt="payments"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
