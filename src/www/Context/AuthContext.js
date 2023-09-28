import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

export const AuthContext = React.createContext();
// const navigate = useNavigate()
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
        setActiveUser(data.user)
      }
      catch (error) {

        localStorage.removeItem("authToken");
        // navigate("/unauthorized")
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
