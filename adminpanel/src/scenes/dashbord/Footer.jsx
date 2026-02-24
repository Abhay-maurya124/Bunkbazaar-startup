import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="bg-gray-800 text-white p-5">
            <div className="container mx-auto py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {/* Column 1 - Navigation Links */}
                <div className="space-y-2">
                    <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                    <NavLink to="/" className="block hover:text-amber-200 transition-colors">Home</NavLink>
                    <NavLink to="/orders" className="block hover:text-amber-200 transition-colors">Orders</NavLink>
                    <NavLink to="/employees" className="block hover:text-amber-200 transition-colors">Employees</NavLink>
                    <NavLink to="/customers" className="block hover:text-amber-200 transition-colors">Customers</NavLink>
                </div>

                {/* Column 2 - Additional Links */}
                <div className="space-y-2">
                    <h3 className="font-bold text-lg mb-4">Resources</h3>
                    <a href="#" className="block hover:text-amber-200 transition-colors">Documentation</a>
                    <a href="#" className="block hover:text-amber-200 transition-colors">Support</a>
                    <a href="#" className="block hover:text-amber-200 transition-colors">API Status</a>
                </div>

                {/* Column 3 - Company Info */}
                <div className="space-y-2">
                    <h3 className="font-bold text-lg mb-4">Company</h3>
                    <a href="#" className="block hover:text-amber-200 transition-colors">About Us</a>
                    <a href="#" className="block hover:text-amber-200 transition-colors">Careers</a>
                    <a href="#" className="block hover:text-amber-200 transition-colors">Contact</a>
                </div>

                {/* Column 4 - Contact Info */}
                <div className="space-y-2">
                    <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                    <p>123 Admin Street</p>
                    <p>City, Country 10001</p>
                    <p>Email: info@adminpanel.com</p>
                    <p>Phone: +1 (123) 456-7890</p>
                </div>
            </div>
            <div className="border-t border-amber-700 py-4 text-center">
                <p>&copy; {new Date().getFullYear()} Admin Panel. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;