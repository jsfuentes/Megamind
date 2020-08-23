import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as Sentry from "@sentry/browser";

import { axios } from "src/utils/utils";
const debug = require("debug")("app:Logout");

Logout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default function Logout(props) {
  async function logout() {
    // localStorage.clear(); loggin out
    try {
      await axios.post("/api/users/logout");
    } catch (err) {
      console.error("Logout failed", err);
      Sentry.captureException(err);
    }
    window.location.reload();
  }

  return (
    <button onClick={logout} className={props.className}>
      {props.children}
    </button>
  );
}
