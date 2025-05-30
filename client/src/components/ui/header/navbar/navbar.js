// Navbar.js
import React from "react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between py-4">
      <div className="container mx-auto">
        <div className="flex items-center">
          <img
            src="/assets/img/logo.png"
            alt="Ege Seramik Logo"
            className="h-10"
          />
        </div>
        <ul className="flex space-x-6">
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Anasayfa
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Hakkımızda
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              İletişim
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
