import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ErrorBoundary from "src/components/ErrorBoundary";
import UserRoute from "src/components/UserRoute";
import UserContext from "src/contexts/UserContext.js";

import Landing from "src/pages/Landing";
import my404 from "src/pages/my404";
import Dashboard from "src/pages/Dashboard";
import Deck from "src/pages/Deck";

toast.configure({
  bodyClassName: "px-2 text-black font-medium w-full relative min-w-full ",
  closeButton: false,
  position: toast.POSITION.TOP_CENTER,
  autoClose: 5000, //false to disable
  closeOnClick: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  // type: toast.TYPE.INFO
});

export default function Router() {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ErrorBoundary>
        {/* <Suspense fallback={<Loading />}> */}
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <UserRoute exact path="/dashboard" component={Dashboard} required />
            <UserRoute exact path="/deck/:id" component={Deck} required />
            <Route component={my404} />
          </Switch>
        </BrowserRouter>
        {/* </Suspense> */}
      </ErrorBoundary>
    </UserContext.Provider>
  );
}
