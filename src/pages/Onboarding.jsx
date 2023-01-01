import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { supabase } from "../../supabaseClient";
import { useState, useRef } from "react";
import profilepic from "../assets/profile_dummy.png";
import { BsUpload } from "react-icons/bs";
//import { IoReturnDownBackOutline } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { useLottie } from "lottie-react";
import checkCompletedLottie from "../assets/checkcompletedlottie.json";
import { useUserProfile } from "../swr/useUserProfile";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import ProgressBar from "@ramonak/react-progress-bar";

const Onboarding = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [image, setImage] = useState("");
  const inputRef = useRef(null);

  const navigate = useNavigate();
  const { user } = JSON.parse(
    localStorage.getItem("sb-waafzskqomubrdnhnpzh-auth-token")
  );
  const { mutate } = useUserProfile(user);
  /*   
 

 

  useEffect(() => {
    data.onboarded == "yes"
      ? navigate("/account/dashboard")
      : navigate("/onboarding");
  }, []);

  
 */

  const options = {
    animationData: checkCompletedLottie,
    //loop: true,
  };

  const { View } = useLottie(options);

  let imagePreview;
  if (image) {
    imagePreview = URL.createObjectURL(image);
    console.log(image);
  }

  const handleClick = () => {
    inputRef.current.click();
  };
  let percentage;

  if (step == 1) {
    percentage = 25;
  } else if (step == 2) {
    percentage = 50;
  } else if (step == 3) {
    percentage = 75;
  } else {
    percentage = 100;
  }

  const updateUserName = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          // gender: gender,
        })
        .eq("id", user.id);
      setStep(2);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  const updateAccountTypetoRenter = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          account_type: "renter",
        })
        .eq("id", user.id);

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  const updateAccountTypetoSearcher = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          account_type: "searcher",
        })
        .eq("id", user.id);

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  const insertImageLink = async () => {
    try {
      await uploadProfileImage()
      const { error } = await supabase
        .from("profiles")
        .update({
          profile_pictureurl: `https://waafzskqomubrdnhnpzh.supabase.co/storage/v1/object/public/avatars/${image.name}`,
        })
        .eq("id", user.id);
      setStep(4);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  const uploadProfileImage = async () => {
    try {
      const { error } = await supabase.storage
        .from("avatars")
        .upload(image.name, image, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error) {
        alert(error.message || error.description);
      }
    } catch (error) {
      alert(error.message || error.description);
    }
  };

  const launchDashboard = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          onboarded: "yes",
        })
        .eq("id", user.id);

      if (error) {
        throw error;
      } else {
        mutate();
        navigate("/account/dashboard");
      }
    } catch (error) {
      alert(error.message || error.description);
    }
  };
  return (
    <div className="flex items-center justify-center absolute top-0 h-[100vh] w-full bg-white  z-40 px-5">
      <div className="flex flex-col items-center justify-center">
        <ProgressBar
          completed={percentage}
          className="w-full pb-6"
          bgColor="#444ce7"
          height="15px"
          width="100%"
          animateOnRender="true"
          labelSize="12px"
        />
        {/* <Link to="/" className="hidden md:block">
          <div className="flex items-center gap-2">
            <AiOutlineHome className="text-3xl text-brandblue" />
            <h4 className="font-[700] text-xl md:text-2xl">Houseshare</h4>
          </div>
        </Link> */}
        <h4 className="text-black font-bold text-[30px] mt-4 text-center">
          Welcome to HouseShare!
        </h4>
        {step !== 4 && (
          <p className="text-[17px] mt-2">
            Let's get your account set up shall we?
          </p>
        )}

        {step == 1 ? (
          <div className="max-w-[450px]  container border-t pt-8 mt-12">
            <form className="flex flex-col gap-4   ">
              <p className="text-black text-[17px] text-center">
                How do we address you?
              </p>
              <div className="flex items-center flex-col gap-6">
                <div className="flex flex-col gap-2 w-[100%]">
                  <input
                    type="text"
                    placeholder="Enter Your First Name"
                    className="border py-2 rounded-lg pl-4"
                    required
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 w-[100%]">
                  <input
                    type="text"
                    placeholder="Enter Your Last Name"
                    className="border py-2 rounded-lg pl-4"
                    required
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>
              </div>
            </form>
            <div className="mt-8 w-full flex flex-col items-center gap-2">
              <button
                className="btnlg w-[100%] font-bold text-[16px]"
                onClick={updateUserName}
              >
                Continue
              </button>
            </div>
          </div>
        ) : null}
        {step == 2 ? (
          <div className="max-w-[450px] container border-t pt-8 mt-12 flex flex-col gap-4 ">
            <p className="text-black text-[17px] text-center">
              How would you use Houseshare?
            </p>
            <div className="flex flex-col sm:flex-row  mt-4 gap-6 w-[100%]">
              <button
                className="sm:w-[50%] w-[100%]"
                onClick={updateAccountTypetoRenter}
              >
                <div className="hover:border-brandblue hover:scale-105 flex flex-col items-start gap-2 border border-black/10 p-6 rounded-lg transition-all ease-in duration-200 ">
                  <h4 className="text-brandblue text-[18px] font-bold ">
                    Renter
                  </h4>
                  <p className="text-[14px] text-left">
                    Put up your property to get a roommate that fits your needs
                  </p>
                </div>
              </button>
              <button
                className="sm:w-[50%] w-[100%]"
                onClick={updateAccountTypetoSearcher}
              >
                <div className="hover:border-brandblue hover:scale-105 flex flex-col items-start gap-2 border border-black/10 p-6 rounded-lg transition-all ease-in duration-200 ">
                  <h4 className="text-brandblue text-[18px] font-bold ">
                    Searcher
                  </h4>
                  <p className="text-[14px] text-left">
                    Look for a short-let apartment that is within your budget
                  </p>
                </div>
              </button>
            </div>
            <div className="mt-8 w-full flex flex-col items-center gap-2">
              <button
                className="btnlg w-[100%] font-bold text-[16px]"
                onClick={() => {
                  setStep(3);
                }}
              >
                Next
              </button>
              <button
                className="text-[14px] flex items-center gap-2 text-gray-500 hover:scale-105 transition-all duration-150 ease-in"
                onClick={() => {
                  setStep(1);
                }}
              >
                <TiArrowBack /> Go Back
              </button>
            </div>
          </div>
        ) : null}
        {step == 3 ? (
          <div className="max-w-[450px] container border-t pt-8 mt-12 flex flex-col gap-4 ">
            <p className="text-black text-[17px] text-center">
              Let's put a face to the name. What do you say?
            </p>
            <div className="flex justify-center  mt-4 gap-6 w-[100%] relative">
              <div className="self-center flex flex-col items-center gap-2">
                <h2 className="font-bold ">Upload Profile Picture</h2>
                <img
                  src={!image ? profilepic : imagePreview}
                  className=" rounded-full shadow-md w-[100px] h-[100px] object-cover mt-4 "
                />
                <button
                  onClick={() => handleClick()}
                  className="text-[12px] mt-4 flex gap-2 items-center bg-brandblue text-white px-4 py-2 rounded-md"
                >
                  Upload Now <BsUpload className="text-white " />
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg "
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                />
              </div>
            </div>
            <div className="mt-8 w-full flex flex-col items-center gap-2">
              <button
                className="btnlg w-[100%] font-bold text-[16px]"
                onClick={insertImageLink}
              >
                Next
              </button>
              <button
                className="text-[14px] flex items-center gap-2 text-gray-500 hover:scale-105 transition-all duration-150 ease-in"
                onClick={() => {
                  setStep(2);
                }}
              >
                <TiArrowBack /> Go Back
              </button>
            </div>
          </div>
        ) : null}
        {step == 4 ? (
          <div className="max-w-[450px] container border-t pt-8 mt-12 flex flex-col gap-4 ">
            <p className="text-black text-[17px] text-center">
              Yay! Your account is all set up and ready to go
            </p>
            <div className="flex justify-center  mt-4 gap-6 w-[100%]">
              <Lottie
                animationData={checkCompletedLottie}
                loop={true}
                className="h-[200px] w-[200px]"
              />
              {/* <div className="self-center flex flex-col items-center gap-2">
                <h2 className="font-bold ">Upload Profile Picture</h2>
                <img
                  src={!image ? profilepic : imagePreview}
                  className=" rounded-full shadow-md w-[100px] h-[100px] object-cover mt-4 "
                />
                <button
                  onClick={() => handleClick()}
                  className="text-[12px] mt-4 flex gap-2 items-center bg-brandblue text-white px-4 py-2 rounded-md"
                >
                  Upload Now <BsUpload className="text-white " />
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg "
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                />
              </div> */}
            </div>
            <div className="mt-8 w-full flex flex-col items-center gap-2">
              <button
                className="btnlg w-[100%] font-bold text-[16px]"
                onClick={launchDashboard}
              >
                Launch Dashboard
              </button>
              {/* <button
                className="text-[14px] flex items-center gap-2 text-gray-500 hover:scale-105 transition-all duration-150 ease-in"
                onClick={() => {
                  setStep(2);
                }}
              >
                <TiArrowBack /> Go Back
              </button> */}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Onboarding;
