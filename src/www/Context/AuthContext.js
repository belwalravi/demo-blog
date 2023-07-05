import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = React.createContext();

const AuthContextProvider = props => {

  const [activeUser, setActiveUser] = useState({})
  const [config, setConfig] = useState({
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  })


  useEffect(() => {

    const controlAuth = async () => {
      try { 
        const { data } = await axios.get("/auth/private", config);
        const cookies = data.headers['set-cookie'];
        const token = Cookies.get(token)
        // Cookies.set("authToken",cookies)
        localStorage.setItem("authToken",token) //store iapToken to use for auth next time
        setActiveUser(data.user)
      }
      catch (error) {

        localStorage.removeItem("authToken");

        setActiveUser({})
      }
    };
    controlAuth()

  }, [])

  return (
    <AuthContext.Provider value={{ activeUser, setActiveUser, config, setConfig }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
