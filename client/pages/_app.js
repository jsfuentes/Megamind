import React, { useState } from "react";
import UserContext from "../contexts/UserContext";
import "./DecklistApp.css";
import "../public/index.css";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
