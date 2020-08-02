import React from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import * as Sentry from "@sentry/browser";

import Navbar from "src/components/Navbar";
import GoogleButton from "src/components/GoogleButton";
const debug = require("debug")("app:pages:Login");

//Can set "route" and "msg" with query params
function Login() {
  const location = useLocation();
  const params = queryString.parse(location.search);

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
        <GoogleButton route={params.route}>
          Google Login with Popup
        </GoogleButton>
      </div>
    </div>
  );
}

export default Login;
