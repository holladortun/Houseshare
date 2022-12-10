import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import profilepic from "../../assets/profile_dummy.png";
import { BsUpload } from "react-icons/bs";
import { useState, useRef } from "react";

const Settings = () => {
  //input ref
  const inputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [user, setUser] = useRecoilState(userState);

  const { email } = user;

  console.log(email);

  const handleClick = () => {
    inputRef.current.click();
  };

  console.log(image);
  return (
    <div className="flex  h-[100vh]  w-[100%]">
      <div className="xl:w-[15%] hidden"></div>
      <div className="xl:w-[85%] w-[100%] pt-8 xl:px-4 px-5 flex flex-col items-center">
        <div>
          <h4 className="font-bold text-4xl mb-8">Account Settings</h4>
        </div>
        <div className="xl:w-[50%] w-full p-5 xl:p-10 bg-white flex flex-col itec ">
          <div className="self-center flex flex-col items-center gap-2">
            <h2 className="font-bold ">Upload Profile Picture</h2>
            <img
              src={!image ? profilepic : image}
              className=" rounded-md shadow-md w-[150px] h-[150px] object-cover mt-4 "
            />
            <button
              onClick={() => handleClick()}
              className="mt-4 flex gap-2 items-center bg-brandblue text-white px-4 py-2 rounded-md"
            >
              Upload Now <BsUpload className="text-white " />
            </button>
            <input
              ref={inputRef}
              type="file"
              accept=".png,.jpg,.jpeg "
              onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
              className="hidden"
            />
          </div>
          <form className="flex flex-col gap-8 mt-12">
            <div className="flex flex-col xl:flex-row gap-8">
              <div className="flex flex-col gap-2 w-[100%] xl:w-[50%]">
                <label for="name">First Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your first name"
                  className="border py-2 rounded-lg pl-4"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 w-[100%] xl:w-[50%]">
                <label for="name">Last Name</label>
                <input
                  type="number"
                  id="name"
                  placeholder="Enter your last name"
                  className="border py-2 rounded-lg pl-4"
                  required
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
                  id="name"
                  placeholder={email}
                  className=" border py-2 rounded-lg pl-4"
                  required
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 w-[100%] xl:w-[50%]">
                <label for="name">Preferred Gender</label>
                <select className="py-[11px] rounded-lg pl-4 bg-white border">
                  <option value="select">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
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

export default Settings;
