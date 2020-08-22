import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import PropTypes from "prop-types";
import * as Sentry from "@sentry/browser";

import conf from "conf";
import UserContext from "src/contexts/UserContext.js";
import { axios } from "src/utils/utils.js";
import Button from "../components/Button";
const debug = require("debug")("app:components:GoogleLogin");

GoogleButton.propTypes = {
  route: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
};

GoogleButton.defaultProps = {
  variant: "black",
  size: "large",
  route: "",
};

//Can set "route" and "msg" with query params
function GoogleButton(props) {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  //user already exists when clicked as it is disabled when userloading
  async function onSignIn(googleUser) {
    if (googleUser.error) {
      if (googleUser.error === "popup_closed_by_user") {
        return;
      }
      if (
        googleUser.error === "idpiframe_initialization_failed" &&
        googleUser.details === "Cookies are not enabled in current environment."
      ) {
        debug("Third party cookies disabled, probably incognito");
      }
      console.error(
        "Failed to login",
        googleUser.error,
        ":",
        googleUser.details
      );
      Sentry.captureMessage(
        `${googleUser.error} from google login: ${googleUser.details}`
      );
      return;
    }

    // debug("GUSER", googleUser, googleUser.accessToken);
    try {
      const resp = await axios.post("/api/users", {
        user: { gaccess_token: googleUser.accessToken },
      });
      const newUser = resp.data.data;
      debug("Login Success: ", newUser);
      setUser(newUser);
      if (props.userCallback) {
        props.userCallback(newUser);
      }
      if (props.route) {
        history.push(props.route);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        debug("Unauthorized user");
        Sentry.setExtra("access_token", googleUser.accessToken);
        Sentry.captureMessage("Bad login");
        toast("Unknown email, try a different account or contact support");
      } else {
        debug(err);
        Sentry.setExtra("googleUser", googleUser);
        Sentry.captureException(err);
        toast("Problem authenticating user with server, contact support");
      }
    }
  }

  return (
    <GoogleLogin
      clientId={conf.get("GOOGLE_CLIENT_ID")}
      buttonText="Login"
      onSuccess={onSignIn}
      onFailure={onSignIn}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <Button
          variant={props.variant}
          size={props.size}
          fullWidth={props.fullWidth}
          disabledStyle={false}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          {props.children}
        </Button>
      )}
    />
  );
}

export default GoogleButton;
