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
  /*   const [session, setSession] = useState(null);
  const [user, setUser] = useState(null); */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  // const [newUserError, setNewUserError] = useState(false);
  /* useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);  */

  const handleSignUp = async (e) => {
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
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: mail,
        password: pass,
      });

      console.log(data?.session.access_token);
      if (error) {
        toast.success(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
          progressClassName: "custom-toast-progress",
        });

        setLoading(false);
      } else {
        await checkOnboardedStatus();
        setMail("");
        setPass("");
      }
    } catch (error) {
      toast.success("Invalid Login details", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000,
        progressClassName: "custom-toast-progress",
      });
      setLoading(false);
    } finally {
      {
      }
    }
  };

  const checkOnboardedStatus = async () => {
    try {
      const {
        user: { id },
      } = JSON.parse(
        localStorage.getItem("sb-waafzskqomubrdnhnpzh-auth-token")
      );
      console.log(id);
      const { data, error } = await supabase
        .from("profiles")
        .select("onboarded")
        .eq("id", id)
        .single();

      if (error) {
        toast.success(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
          progressClassName: "custom-toast-progress",
        });
      } else {
        const { onboarded } = data;
        onboarded == "yes"
          ? navigate("/account/dashboard")
          : navigate("/account/onboarding");
      }
    } catch (error) {}
  };

  const uploadUserInfo = async (id) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
        })
        .eq("id", id);
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error);
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
    <div className="overflow-hidden">
      <Navbar />
      <div>
        <div className="  min-h-[72vh] flex flex-col items-center justify-center gap-4 ">
          <div className="container max-w-[500px] px-10">
            <h3 className="text-4xl text-center">Register</h3>

            <form className="flex flex-col gap-4 mt-8 " onSubmit={handleSignUp}>
              {/* <div className="flex items-center gap-6">
                <div className="flex flex-col gap-2 w-[50%]">
                  <input
                    type="text"
                    placeholder="Enter Your First Name"
                    className="border py-2 rounded-lg pl-4"
                    required
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 w-[50%]">
                  <input
                    type="text"
                    placeholder="Enter Your Last Name"
                    className="border py-2 rounded-lg pl-4"
                    required
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>
              </div> */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col gap-2  w-[100%]">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="border py-2 rounded-lg pl-4"
                    required
                    value={mail}
                    onChange={(event) => setMail(event.target.value)}
                  />
                </div>
                {/* <div className="flex flex-col gap-2  w-[100%]">
                  <input
                    type="number"
                    placeholder="Enter Your Phone Number"
                    className="border py-2 rounded-lg pl-4"
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div> */}
              </div>

              <div className="flex flex-col gap-2  ">
                <input
                  type="password"
                  id="description"
                  placeholder="Enter Your Password"
                  className="border py-2 rounded-lg pl-4"
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
          <p className="text-[14px]">
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
