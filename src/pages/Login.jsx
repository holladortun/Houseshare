import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { AiFillAlert } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import { userState } from "../atoms/userAtom";
import { authSessionState } from "../atoms/authSessionAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { ClipLoader } from "react-spinners";
import { useUserProfile } from "../swr/useUserProfile";

const Login = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const handleNavigation = () => navigate("/account");
  const session = useRecoilValue(authSessionState);

  //const { data } = useUserProfile(user);
  /*   const userinfo = JSON.parse(
    localStorage.getItem("sb-waafzskqomubrdnhnpzh-auth-token")
  );

  let user;
  if (userinfo) {
    user = userinfo.user;
  }
  const { data: userProfile } = useUserProfile(user); */

  useEffect(() => {
    if (session) {
      navigate("/account/dashboard");
    }
  }, []);

  // sign in function

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

  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className=" min-h-[72vh] overflow-hidden flex flex-col items-center justify-center gap-4 px-[20px]">
        <div className=" ">
          <h3 className="text-4xl text-center">Login</h3>

          <form className="flex flex-col gap-4 mt-8 " onSubmit={handleSignIn}>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="border py-2 rounded-lg pl-4"
                required
                value={mail}
                onChange={(event) => setMail(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <input
                type="password"
                id="description"
                className="border py-2 rounded-lg pl-4"
                placeholder="Enter Your Password"
                required
                value={pass}
                onChange={(event) => setPass(event.target.value)}
              />
            </div>
            {loading ? (
              <p className="text-center text-[16px] w-full bg-brandblue text-white rounded-md py-3 flex items-center justify-center gap-2">
                <ClipLoader size={20} color="#fff" speedMultiplier={0.8} />
                Logging in...
              </p>
            ) : (
              <button type="submit" className="btnmd py-3 disabled">
                Login
              </button>
            )}
          </form>
        </div>
        <p className="text-[14px]">
          Don't have an account?
          <span className="ml-1">
            <button className="text-brandblue font-bold underline">
              <Link to="/register">create one now</Link>
            </button>
          </span>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
