/* Completed Header component */
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-green-900 p-6">
      <div className="flex w-full flex-grow lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <div className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
            <Link to="/">Index</Link>
          </div>
          <div className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
            <Link
              to="/dashboard"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
            >
              Dashboard
            </Link>
          </div>
        </div>
        <div>
          <div className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-green-200 mt-4 lg:mt-0">
            <Link to="/index">SIGN IN [CURRENTLY]</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
