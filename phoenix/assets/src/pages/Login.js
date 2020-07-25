import React, { useContext } from "react";
import { toast } from "react-toastify";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import GoogleLogin from "react-google-login";
import * as Sentry from "@sentry/browser";

import conf from "src/conf";
import UserContext from "src/contexts/UserContext.js";
import { axios } from "src/utils/utils.js";
import Navbar from "src/components/Navbar";
import Button from "src/components/Button";
const debug = require("debug")("app:pages:Login");

//Can set "route" and "msg" with query params
function Login() {
  const location = useLocation();
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const params = queryString.parse(location.search);

  async function onSignIn(googleUser) {
    if (googleUser.error) {
      if (googleUser.error === "popup_closed_by_user") {
        return;
      }

      console.error("Failed to login", googleUser.error);
      Sentry.captureMessage(`${googleUser.error} from google login`);
      return;
    }

    debug("GUSER", googleUser, googleUser.accessToken);
    try {
      const resp = await axios.post("/api/users", {
        user: { gaccess_token: googleUser.accessToken },
      });
      const newUser = resp.data;
      debug("Login Success: ", newUser);
      setUser(newUser);
      const newRoute = params.route ? params.route : "/";
      history.push(newRoute);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        debug("Unauthorized user");
        Sentry.setExtra("access_token", googleUser.accessToken);
        Sentry.captureMessage("Bad login");
        toast("Unknown email, try a different account or contact support");
      } else {
        Sentry.captureException(err);
        toast("Problem authenticating user with server, contact support");
      }
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar
        inContainer={false}
        className="row-start-1 row-end-2 col-start-1 col-end-4"
      />
      <div className="flex flex-1 w-full flex-col items-center justify-center">
        <div className="text-center text-2xl lg:text-2.5xl font-medium mb-12">
          {params.msg ? params.msg : "Welcome to Slingshow!"}
        </div>
        <GoogleLogin
          clientId={conf.get("GOOGLE_CLIENT_ID")}
          buttonText="Login"
          onSuccess={onSignIn}
          onFailure={onSignIn}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <Button
              size="large"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Login With Google
            </Button>
          )}
        />
      </div>
    </div>
  );
}

export default Login;
