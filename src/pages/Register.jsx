import React from "react";
import CityCard from "../components/CityCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { supabase } from "../../supabaseClient";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [newUserError, setNewUserError] = useState(false);
  /* useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);  */

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { user, error } = await supabase.auth.signUp({
        email: mail,
        password: pass,
      });

      if (error) {
        alert(error.message);
      } else {
        toast.success("Account created, please check your mail", {
          position: toast.POSITION.TOP_CENTER,
        });
        setMail("");
        setPass("");
      }
    } catch (error) {
      alert(error.error_description || error);
    } finally {
      {
        setLoading(false);
      }
    }
  };

  /*  */

  /* toast.promise(Login, {
    pending: "Promise is pending",
    success: "Promise resolved 👌",
    error: "Promise rejected 🤯",
  });*/

  // Sign Out function

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className="container  mx-auto  min-h-[72vh] flex flex-col items-center justify-center gap-4 ">
          <div className="shadow-lg p-10 w-[500px]">
            <h3 className="text-4xl text-center">Register</h3>

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
                  Creating account...
                </p>
              ) : (
                <button type="submit" className="btnmd py-3 disabled">
                  Create Account
                </button>
              )}
            </form>
          </div>
          <p className="text-[16px]">
            Have an account already? You can
            <span className="ml-1">
              <button className="text-brandblue font-bold underline">
                <Link to="/login">Sign in</Link>
              </button>
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
