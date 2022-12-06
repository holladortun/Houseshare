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

function App() {
  const [session, setSession] = useState(null);
  // const navigate = useNavigate();
  // const handleNavigation = () => navigate("/login");
  const [user, setUser] = useState(null);
  const [loggedin, setLoggedin] = useState(true);

  /*  */

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  console.log(session);

  if (session !== null) {
    console.log("not null");

    console.log(loggedin);
  }

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="account" element={<Account /* user={session?.user} */ />} exact>
        <Route path="/account/properties" element={<Properties />} />
        <Route path="/account/listings" element={<Listings />} />
        <Route path="/account/notifications" element={<Notifications /> } />
        <Route path="/account/memberships" element={<Membership />} />
        <Route path="/account/chat" element={<Listings />} />
      </Route>
      {/*<Route element={<PrivateRoutes session={session} />}>
        <Route
          path="account"
          element={}
        />
      </Route>  */}
      <Route path="register" element={<Register />} />

      <Route path="login" element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
