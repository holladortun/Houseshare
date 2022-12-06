import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { AiFillAlert } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const handleNavigation = () => navigate("/account");
  /* 
  

  
  const [session, setSession] = useState(null);


  useEffect(() => {
       if (session !== null) {
        handleNavigation();
      }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []); */
  // react use navigate to redirect logged in user to account page

  // sign in function
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: mail,

        password: pass,
      });

      if (error) {
        alert(error.message);
      } else {
        alert("You have been signed in successfully");

        setMail("");
        setPass("");
        handleNavigation();
      }
    } catch (error) {
      alert(error.error_description || error);
    } finally {
      {
        setLoading(false);
      }
    }
  };

  /* toast.promise(Login, {
    pending: "Promise is pending",
    success: "Promise resolved 👌",
    error: "Promise rejected 🤯",
  });*/

  // Sign Out function
  /* const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  }; */

  return (
    <div>
      <Navbar />
      <div className="container  mx-auto  min-h-[72vh] flex flex-col items-center justify-center gap-4 ">
        <div className="shadow-lg p-10 w-[500px]">
          <h3 className="text-4xl text-center">Login</h3>

          <form className="flex flex-col gap-4 mt-8 " onSubmit={handleSignIn}>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Enter Your Email"
                className="border py-2 rounded-lg pl-4"
                required
                value={mail}
                onChange={(event) => setMail(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2  border py-2 rounded-lg pl-4">
              <input
                type="password"
                id="description"
                placeholder="Enter Your Password"
                required
                value={pass}
                onChange={(event) => setPass(event.target.value)}
              />
            </div>
            {loading ? (
              <p className="text-center text-[16px] w-full bg-brandblue text-white rounded-md py-3">
                Logging in...
              </p>
            ) : (
              <button type="submit" className="btnmd py-3 disabled">
                Login
              </button>
            )}
          </form>
        </div>
        <p className="text-[16px]">
          Don't have an account?
          <span className="ml-1">
            <button className="text-brandblue font-bold underline">
              <Link to="/register">create an account now</Link>
            </button>
          </span>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
