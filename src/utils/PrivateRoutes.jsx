import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ user }) => {
  return user == true ? <Outlet /> : <Navigate to="/login" />;
 
};

export default PrivateRoutes;
