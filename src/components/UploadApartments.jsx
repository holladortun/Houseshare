import React from "react";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { propertyImageState } from "../atoms/propertyImage";
import { userState } from "../atoms/userAtom";
import { authSessionState } from "../atoms/authSessionAtom";
import { GrClose } from "react-icons/gr";
import { Textarea } from "flowbite-react";

const UploadApartments = ({ closeUploadProperty }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bedrooms, setBedrooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [amount, setAmount] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [propertyImage, setPropertyImage] = useState(null);
  const [ispropertyAdded, setIsPropertyAdded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  const { user } = useRecoilValue(authSessionState);

  /*   const { id } = user;
  console.log(id); */

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const imagePath = `${crypto.randomUUID()}_${propertyImage.name}`;
      await uploadImage(imagePath);

      const { error } = await supabase.from("apartments").insert({
        title: title,
        description: description,
        amount: amount,
        bathrooms: bathrooms,
        bedrooms: bedrooms,
        gender: gender,
        location: location,
        propertyimageurl: `https://waafzskqomubrdnhnpzh.supabase.co/storage/v1/object/public/apartments/${imagePath}`,
        author_id: user?.id,
      });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);

      setTitle("");
      setDescription("");
      setBedrooms("");
      setBathrooms("");
      setAmount("");
      setGender("");
      setLocation("");
      setIsPropertyAdded(true);
    }
  };

  const uploadImage = async (imagePath) => {
    if (propertyImage) {
      const { data, error } = await supabase.storage
        .from("apartments")
        .upload(`${imagePath}`, propertyImage);

      if (error) throw error;
      console.log(data);
    }
  };

  /*  const getImageUrl =  () => {
    const { data } = supabase.storage
      .from("apartments")
      .getPublicUrl(propertyImage.name);
    setUploadedImage(data.publicUrl);
   
  }; */

  return (
    <div className=" relative py-4 shadow-xl">
      <h4 className=" font-bold  pb-8 text-2xl"></h4>

      {isLoading ? (
        <div className="w-[900px] h-[400px] mx-auto flex justify-center items-center">
          <p>Your property is being listed...</p>
        </div>
      ) : (
        <div className="container max-w-[700px] mx-auto bg-white rounded-lg ">
          <div className="shadow-lg xl:p-10 p-5 flex flex-col gap-2">
            <GrClose
              className="self-end text-brandblue text-[25px] cursor-pointer hover:scale-110 hover:transition-all ease-in duration-300"
              onClick={closeUploadProperty}
            />
            <form
              onSubmit={() => handleSubmit(event)}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-2">
                <label for="description">Title of Listing</label>
                <input
                  type="text"
                  maxLength="50"
                  placeholder="For ex. Two Bedroom Flat in Lekki"
                  className="border py-2 rounded-lg pl-4"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col xl:flex-row gap-8">
                <div className="flex flex-col gap-2 xl:w-[50%]">
                  <label for="name">No. of Bathrooms</label>
                  <input
                    type="number"
                    id="name"
                    placeholder="Enter number of Bathrooms"
                    className="border py-2 rounded-lg pl-4"
                    required
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2 xl:w-[50%]">
                  <label for="name">No. of Bedrooms</label>
                  <input
                    type="number"
                    id="name"
                    placeholder="Enter number of Bedrooms"
                    className="border py-2 rounded-lg pl-4"
                    required
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col xl:flex-row gap-8">
                <div className="flex flex-col gap-2 xl:w-[50%]">
                  <label for="name">Location of Property</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter description for your property"
                    className="border py-2.5 rounded-lg pl-4"
                    required
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 xl:w-[50%]">
                  <label for="name">Preferred Gender</label>
                  <select
                    className="py-[11px] rounded-lg pl-4 bg-white border"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    required
                  >
                    <option value="select">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="female">Either</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-8 flex-col xl:flex-row">
                <div className="flex flex-col gap-2 xl:w-[50%]">
                  <label for="name">Amount</label>
                  <input
                    type="number"
                    placeholder="Enter cost of your property"
                    required
                    className="border py-2 rounded-lg pl-4"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 xl:w-[50%]">
                  <label for="name">Upload Property Image</label>
                  <input
                    required
                    type="file"
                    id="name"
                    placeholder="Ex.200,000"
                    className=" py-2 rounded-lg "
                    onChange={(e) => {
                      setPropertyImage(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label for="description">Description of Property</label>
                <textarea
                  rows="5"
                  maxLength="800"
                  placeholder="Enter description for your property"
                  className="border py-2 rounded-lg pl-4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btnmd py-3">
                Add Property
              </button>
            </form>
          </div>
        </div>
      )}
      {/* {ispropertyAdded && (
        <div className="w-screen h-screen bg-black/80 absolute top-0 flex justify-center items-center">
          <div className="bg-white w-[400px] h-[200px] py-5 rounded-lg flex flex-col justify-center ">
            <h4 className="text-brandblue text-center font-[600] text-2xl">
              Your property has been listed
            </h4>

            <div className="flex justify-center gap-4 mt-8">
              <button
                className="btnmd"
                onClick={() => setIsPropertyAdded(false)}
              >
                Add New
              </button>
              <Link
                onClick={() => setIsPropertyAdded(false)}
                to="/home"
                className="btnmd bg-transparent text-brandblue border-2 border-brandblue hover:text-white"
              >
                View Listed Property
              </Link>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default UploadApartments;
