import React from "react";
import { authSessionState } from "../atoms/authSessionAtom";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useUserProfile } from "../swr/useUserProfile";

const PrivateRoute = ({ children }) => {
/*   const { user } = JSON.parse(
    localStorage.getItem("sb-waafzskqomubrdnhnpzh-auth-token")
  );
  const { data } = useUserProfile(user);
  console.log(data); */

  const jwt = useRecoilValue(authSessionState);

  return jwt  ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
