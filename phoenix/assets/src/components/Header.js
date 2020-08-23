/* Completed Header component */
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "src/contexts/UserContext.js";
import Logo from "src/components/Logo";
import UserDropdown from "src/components/UserDropdown";
import GoogleButton from "src/components/GoogleButton";

function Header() {
  const { user } = useContext(UserContext);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-green-900 p-6">
      <div className="flex w-full flex-grow lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow flex flex-row items-center">
          <Logo />
          <div className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
            <Link
              to="/dashboard"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mx-4"
            >
              Dashboard
            </Link>
          </div>
        </div>
        <div>
          {user ? (
            <UserDropdown />
          ) : (
            <GoogleButton variant="inverted-black" route="/dashboard">
              Login
            </GoogleButton>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
