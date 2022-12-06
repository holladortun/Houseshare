import React from "react";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { propertyImageState } from "../atoms/propertyImage";

const UploadApartments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [toilets, setToilets] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [amount, setAmount] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [propertyImage, setPropertyImage] = useState(null);
  const [ispropertyAdded, setIsPropertyAdded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      uploadImage();
      setIsLoading(true);
      const { error } = await supabase.from("apartments").insert({
        description: description,
        amount: amount,
        bathroom: bathrooms,
        toilet: toilets,
        gender: gender,
        location: location,
        propertyimageurl: `https://waafzskqomubrdnhnpzh.supabase.co/storage/v1/object/public/apartments/${propertyImage.name}`,
      });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
      /*  const { error } = await supabase.from("apartments").insert({
        propertyimageurl: uploadedImage,
      }); */
      /* const { data } = supabase.storage
        .from("apartments")
        .getPublicUrl(propertyImage.name);
      setUploadedImage(data.publicUrl);
      console.log(uploadedImage); */
    }

    setDescription("");
    setToilets("");
    setBathrooms("");
    setAmount("");
    setGender("");
    setLocation("");

    setIsPropertyAdded(true);
  };

  const uploadImage = async () => {
    if (propertyImage) {
      const { data, error } = await supabase.storage
        .from("apartments")
        .upload(propertyImage.name, propertyImage);

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
    <div className=" relative py-20">
      <h4 className=" font-bold  pb-8 text-2xl"></h4>

      {isLoading ? (
        <div className="w-[900px] h-[400px] mx-auto flex justify-center items-center">
          <p>Your property is being listed...</p>
        </div>
      ) : (
        <div className="container max-w-[900px] mx-auto bg-white ">
          <div className="shadow-lg p-10">
            <form
              onSubmit={() => handleSubmit(event)}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-2">
                <label for="description">Description of Property</label>
                <input
                  type="text"
                  id="description"
                  placeholder="Enter description for your property"
                  className="border py-2 rounded-lg pl-4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-8">
                <div className="flex flex-col gap-2 w-[50%]">
                  <label for="name">No. of Bathrooms</label>
                  <input
                    type="number"
                    id="name"
                    placeholder="Enter description for your property"
                    className="border py-2 rounded-lg pl-4"
                    required
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2 w-[50%]">
                  <label for="name">No. of Toilets</label>
                  <input
                    type="number"
                    id="name"
                    placeholder="Enter description for your property"
                    className="border py-2 rounded-lg pl-4"
                    required
                    value={toilets}
                    onChange={(e) => setToilets(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-8">
                <div className="flex flex-col gap-2 w-[50%]">
                  <label for="name">Location of Property</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter description for your property"
                    className="border py-2 rounded-lg pl-4"
                    required
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 w-[50%]">
                  <label for="name">Preferred Gender</label>
                  <select
                    className="py-[11px] rounded-lg pl-4 bg-white border"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option value="select">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="flex flex-col gap-2 w-[50%]">
                  <label for="name">Amount</label>
                  <input
                    type="type"
                    id="name"
                    required
                    className="border py-2 rounded-lg pl-4"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 w-[50%]">
                  <label for="name">Upload Property Image</label>
                  <input
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

              <button type="submit" className="btnmd py-3">
                Add Property
              </button>
            </form>
          </div>
        </div>
      )}
      {ispropertyAdded && (
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
      )}
    </div>
  );
};

export default UploadApartments;
