import React, { useState } from "react";
import { toast } from "react-toastify";

import UserContext from "../contexts/UserContext";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  bodyClassName: "px-2 text-white font-medium w-full relative  min-w-full ",
  // progressClassName: "bg-gray-700",
  toastClassName:
    "py-3 rounded bg-gray-900 flex items-center justify-center min-h-0 shadow-md ", //disable default min height
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
