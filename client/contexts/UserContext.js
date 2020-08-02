import React from "react";

const UserContext = React.createContext({
  user: null,
  setUser: null,
});

export default UserContext;
