// Header.js
import React from "react";
import Navbar from "./navbar/navbar";

function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-500 to-gray-200 py-6">
      <div className="flex">
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
