import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Account from "./pages/dashboardpages/Account";
import Properties from "./pages/dashboardpages/Properties";
import Listings from "./pages/dashboardpages/Listings";
import Notifications from "./pages/dashboardpages/Notifications";
import Chat from "./pages/dashboardpages/Chat";
import { supabase } from "../supabaseClient";
import PrivateRoutes from "./utils/PrivateRoutes";
import Membership from "./pages/dashboardpages/Membership";
import { useRecoilState } from "recoil";
import { authSessionState } from "./atoms/authSessionAtom";
import PrivateRoute from "./privateroutes/Protected";
import Settings from "./pages/dashboardpages/Settings";

function App() {
  const [session, setSession] = useRecoilState(authSessionState);
  

  /*  */

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

   supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    }); 
  }, []);

  {
    !session
      ? console.log(session, "login")
      : console.log(session, "account");
  }

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />

      <Route
        path="account"
        element={
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        }
        exact
      >
        <Route path="/account/properties" element={<Properties />} />
        <Route path="/account/listings" element={<Listings />} />
        <Route path="/account/notifications" element={<Notifications />} />
        <Route path="/account/memberships" element={<Membership />} />
        <Route path="/account/chat" element={<Chat />} />
        <Route path="/account/settings" element={<Settings />} />
      </Route>
    
      <Route path="register" element={<Register />} />

      <Route path="login" element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
