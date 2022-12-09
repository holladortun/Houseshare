import React from "react";
import { authSessionState } from "../atoms/authSessionAtom";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const PrivateRoute = ({ children }) => {
  // const auth = useRecoilValue(authSessionState);

  const jwt = useRecoilValue(authSessionState);

console.log(jwt);
  return jwt ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
