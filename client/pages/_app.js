import React, { useState } from "react";
import { toast } from "react-toastify";

import UserContext from "../contexts/UserContext";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

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

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
