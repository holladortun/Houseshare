import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import profilepic from "../../assets/profile_dummy.png";
import { BsUpload } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { useState, useRef } from "react";
import { supabase } from "../../../supabaseClient";
import { profileImageState } from "../../atoms/profileImageAtom";
import { useUserProfile } from "../../swr/useUserProfile";

const Profile = () => {
  const inputRef = useRef(null);

  const [image, setImage] = useRecoilState(profileImageState);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [budget, setBudget] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredGender, setPreferredGender] = useState("");

  const {
    user: { email, id },
  } = JSON.parse(localStorage.getItem("sb-waafzskqomubrdnhnpzh-auth-token"));
  const { user } = JSON.parse(
    localStorage.getItem("sb-waafzskqomubrdnhnpzh-auth-token")
  );
  const { data, mutate } = useUserProfile(user);

  console.log(data);

  let imagePreview;
  if (image) {
    imagePreview = URL.createObjectURL(image);
    console.log(image);
  }

  console.log(imagePreview);

  const handleClick = () => {
    inputRef.current.click();
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
        console.log(error.message || error.description);
      }
    } catch (error) {
      console.log(error.message || error.description);
    }
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    const updatedData = {
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      budget: budget,
      preferred_gender: preferredGender,
      profile_pictureurl: `https://waafzskqomubrdnhnpzh.supabase.co/storage/v1/object/public/avatars/${image.name}`,
    };

    try {
      uploadProfileImage();

      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          // budget: budget,
          //preferred_gender: preferredGender,
          profile_pictureurl: `https://waafzskqomubrdnhnpzh.supabase.co/storage/v1/object/public/avatars/${image.name}`,
        })
        .eq("id", id);
      if (error) {
        alert(error.message || error.description);
        console.log(error.message || error.description);
      } else {
        console.log("profile successfully updated");
        mutate();
      }
    } catch (error) {
      alert(error);
    } finally {
      setBudget("");
      setFirstName("");
      setLastName("");
      setGender("");
      setPreferredGender("");
    }
  };
  return (
    <div className="flex  h-[100vh]  w-[100%]">
      <div className="xl:w-[15%] hidden xl:block"></div>
      <div className="xl:w-[85%] w-[100%] pt-8 xl:px-4 px-5 flex flex-col items-center ">
        <div>
          <h4 className="font-bold text-4xl mb-8">Account Settings</h4>
        </div>
        <div className="xl:w-[60%] w-full p-5 xl:p-10 bg-white flex flex-col itec ">
          <div className="self-center flex flex-col items-center gap-2">
            <h2 className="font-bold ">Profile Picture</h2>
            <img
              src={data?.profile_pictureurl}
              className=" rounded-full shadow-md w-[150px] h-[150px] object-cover mt-4 "
            />
            <button
              onClick={() => handleClick()}
              className="mt-2 flex gap-2 items-center bg-brandblue text-white px-4 py-2 rounded-md text-[13px]"
            >
              Change Picture <MdEdit className="text-white " />
            </button>
            <input
              ref={inputRef}
              type="file"
              accept=".png,.jpg,.jpeg "
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
            <div className="flex items-center font-bold gap-2 mt-8">
              <p className="text-black">{data?.first_name}</p>
              <p className="text-black">{data?.last_name}</p>
            </div>
          </div>
          <form className="flex flex-col gap-8 mt-12" onSubmit={handleProfile}>
            <div className="flex flex-col xl:flex-row gap-8">
              <div className="flex flex-col gap-2 w-[100%] xl:w-[50%]">
                <label for="first">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  placeholder={data?.first_name.toUpperCase()}
                  className="border py-2 rounded-lg pl-4"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2 w-[100%] xl:w-[50%]">
                <label for="name">Last Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder={data?.last_name.toUpperCase()}
                  className="border py-2 rounded-lg pl-4"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-8 flex-col xl:flex-row">
              <div className="flex flex-col gap-2 w-[100%] xl:w-[50%]">
                <label for="name">
                  Email{" "}
                  <span className="text-[14px] text-brandblue">
                    (this cannot be changed)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder={email}
                  className=" border py-2 rounded-lg pl-4"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 w-[100%] xl:w-[50%]">
                <label for="name">Phone Number</label>
                <input
                  type="number"
                  placeholder={data?.phone}
                  className=" border py-2 rounded-lg pl-4"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-8 flex-col xl:flex-row">
              <div className="flex flex-col gap-2 w-[100%] xl:w-[100%]">
                <label for="About me ">About Me</label>
                <textarea
                  name="about"
                  rows={4}
                  className=" border py-2 rounded-lg pl-4"
                ></textarea>

                {/* <input
                  type="number"
                  id="budget"
                  placeholder="30000"
                  className=" border py-2 rounded-lg pl-4"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                /> */}
              </div>
              {/* 
              <div className="flex flex-col gap-2 w-[100%] xl:w-[50%]">
                <label for="preferred gender">Preferred Gender</label>
                <select
                  className="py-[11px] rounded-lg pl-4 bg-white border"
                  value={preferredGender}
                  onChange={(e) => setPreferredGender(e.target.value)}
                >
                  <option value="select">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
               */}
            </div>

            <button type="submit" className="btnmd py-3">
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
