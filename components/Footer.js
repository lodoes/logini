// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black-800 text-white p-6 text-center">
      <div className="flex justify-around mb-4">
        <div>
          <h4 className="font-bold">Product</h4>
          <p>All Residences</p>
          <p>Agencies</p>
        </div>
        <div>
          <h4 className="font-bold">Resources</h4>
          <p>Blog</p>
          <p>User guides</p>
        </div>
        <div>
          <h4 className="font-bold">Company</h4>
          <p>About</p>
          <p>Join us</p>
        </div>
      </div>
      <p>&copy; 2023 Real Estate, Inc. - Privacy - Terms - Sitemap</p>
    </footer>
  );
};

export default Footer;
