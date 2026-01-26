import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // You can connect this to your subscribe API later
    console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      {/* CTA / Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-amber-600 rounded-2xl p-8 text-center text-white mb-10">
          <h2 className="text-3xl font-bold mb-2">
            Stay in the Loop!
          </h2>
          <p className="mb-4">
            Subscribe to our newsletter for updates, deals, and exclusive offers.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row justify-center gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-2 rounded-lg text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gray-900 text-amber-300 px-6 py-2 font-bold rounded-lg hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              About Us
            </h3>
            <p className="text-sm">
              We’re a campus marketplace built for students — safe, local,
              and made to help you sell and buy within your college community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact / Social Icons */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              Contact Us
            </h3>
            <p className="text-sm mb-4">
              Email: support@example.com
              <br />
              Phone: +91 12345 67890
            </p>

            <div className="flex gap-4 text-lg">
              <a href="#" className="hover:text-white transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="border-t border-gray-700 mt-10"></div>

        {/* Legal / Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 mt-4">
          <p>© {new Date().getFullYear()} BunkBazaar. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition">
              Refund Policy
            </a>
          </div>
        </div>
      
      </div>
    </footer>
  );
};

export default Footer;
