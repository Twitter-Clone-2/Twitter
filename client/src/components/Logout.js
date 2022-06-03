import React from "react";
//import { useHistory } from "react-router-dom";
const Logout = () => {
  // const history = useHistory();
  const logout = () => {
    localStorage.removeItem("id");
    //history.push("/");
  };
  return <button onClick={() => logout()}>Logout</button>;
};

export default Logout;
