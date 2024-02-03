import React from "react";
import { TiSocialTwitter } from "react-icons/ti";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialYoutube } from "react-icons/ti";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-light text-muted">
      <section className="p-4">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Solutions</h6>
              <p>
                <a href="#!" className="text-reset">
                  Marketting
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Analytics
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Commerce
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Insights
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Supports
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Documentation</h6>
              <p>
                <a href="#!" className="text-reset">
                  Guides
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  API Status
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Legal</h6>
              <p>
                <a href="#!" className="text-reset">
                  Claims
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Privacy
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Terms
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p >
                <IoLocationSharp className="fs-4 mx-2"/>
                New York, NY 10012, US
              </p>
              <p>
                <MdOutlineMail className="fs-4 mx-2"/>
                info@example.com
              </p>
              <p>
                <FaPhoneAlt className="fs-4 mx-2"/>+ 01 234 567 88
              </p>
              <p>
                <FaPhoneAlt className="fs-4 mx-2"/>+ 01 234 567 89
              </p>
              <p>Follow Us:</p>
              <div>
                <a href="#" className="me-4 text-reset">
                  <SlSocialFacebook className="fs-4 "/>
                </a>
                <a href="https://twitter.com/JavaScript" className="me-4 text-reset">
                  <TiSocialTwitter className="fs-4"/>
                </a>
                <a href="#" className="me-4 text-reset">
                  <TiSocialYoutube className="fs-4"/>
                </a>
                <a href="#" className="me-4 text-reset">
                  <SlSocialInstagram className="fs-4"/>
                </a>
                <a href="#" className="me-4 text-reset">
                  <SlSocialLinkedin className="fs-4"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4">© Copyright:SellX</div>
    </footer>
  );
};

export default Footer;
