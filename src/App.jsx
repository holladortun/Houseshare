import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Account from "./pages/dashboardpages/Account";
import Properties from "./pages/dashboardpages/Properties";
import MyListings from "./pages/dashboardpages/MyListings";
import Notifications from "./pages/dashboardpages/Notifications";
import Chat from "./pages/dashboardpages/Chat";
import { supabase } from "../supabaseClient";
import PrivateRoutes from "./utils/PrivateRoutes";
import Membership from "./pages/dashboardpages/Membership";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authSessionState } from "./atoms/authSessionAtom";
import PrivateRoute from "./privateroutes/Protected";
import Settings from "./pages/dashboardpages/Settings";
import { userState } from "./atoms/userAtom";
import { propertyDataState } from "./atoms/propertyDataAtom";
import { allUsersState } from "./atoms/allUsersAtom";
import SingleProperty from "./pages/SingleProperty";
import Listings from "./pages/Listings";
import Dashboard from "./pages/dashboardpages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import { useSession } from "./swr/useSession";
import Onboarding from "./pages/Onboarding";

function App() {
  const [session, setSession] = useRecoilState(authSessionState);

  const setUserState = useSetRecoilState(userState);
  /* const setPropertyData = useSetRecoilState(propertyDataState);
  const [allUsers, setAllUsers] = useRecoilState(allUsersState); */
  /*  */
  const { data, user } = useSession();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session);
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    setUserState(session?.user);
    //getProperties();
  }, []);

  /*   const getProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("apartments")
        .select(`*,profiles(*)`)
        //.limit(3)
        .order("id", {
          ascending: false,
        });
      if (error) throw error;
      if (data != null) {
       // setPropertyData(data);
      }
    } catch (error) {
      alert(error.message);
    }
  };
 */
  return (
    <>
      <ToastContainer transition={Slide} />
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
          <Route path="/account/dashboard" element={<Dashboard />} />
          <Route path="/account/onboarding" element={<Onboarding />} />
          <Route path="/account/properties" element={<Properties />} />
          <Route path="/account/mylistings" element={<MyListings />} />
          <Route path="/account/notifications" element={<Notifications />} />
          <Route path="/account/memberships" element={<Membership />} />
          <Route path="/account/chat" element={<Chat />} />
          <Route path="/account/settings" element={<Settings />} />
        </Route>

        <Route path="register" element={<Register />} />

        <Route path="login" element={<Login />} />

        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:listing_id" element={<SingleProperty />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
