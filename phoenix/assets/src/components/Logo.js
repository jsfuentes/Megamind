import React from "react";
import PropTypes from "prop-types";

import logoImg from "src/img/logo.png";

function Logo() {
  return (
    <a className="flex items-center" href="/">
      <img className="w-9 h-9" src={logoImg} alt="Megamind Logo" />
    </a>
  );
}

export default Logo;
