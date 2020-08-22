import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect, useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import queryString from "query-string";
import PropTypes from "prop-types";
import * as Sentry from "@sentry/browser";

import Loading from "src/components/Loading.js";
import { axios } from "src/utils/utils.js";
import UserContext from "src/contexts/UserContext.js";
const debug = require("debug")("app:components:UserRoute");

//Ensure User is defined before accessing route
export default function UserRoute(props) {
  const { required, ...rest } = props;
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const redirectParams = queryString.stringify({
    route: location.pathname,
    msg: "Please login to view this page",
  });

  async function checkForUser() {
    let newUser;
    try {
      const resp = await axios.get("/api/users/me");
      newUser = resp.data.data;
    } catch (err) {
      toast("Problem with authentication");
      console.error("UserRoute err", err);
      Sentry.captureException(err);
    }

    if (!newUser & required) {
      //for some reason redirect wouldn't work so had to use history here
      debug("Auth failed, redirecting from", location.pathname);
      toast(`Please login to access ${location.pathname}`);
      history.push(`/?${redirectParams}`);
    } else {
      debug("NewUser", newUser);
      setUser(newUser);
      setLoading(false); //always stop after one try
    }
  }

  useEffect(() => {
    if (!user) {
      checkForUser();
    } else {
      setLoading(false);
    }
  }, [location, user]);

  if (loading) return <Loading />;
  else return <Route {...rest} />;
}

UserRoute.defaultProps = {
  required: false,
};
