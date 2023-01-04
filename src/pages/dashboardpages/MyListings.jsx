import React from "react";
import PropertyCard from "../../components/PropertyCard";
import UploadApartments from "../../components/UploadApartments";
import { FaPlus } from "react-icons/fa";
import { supabase } from "../../../supabaseClient";
import { useState, useEffect } from "react";
import UserListingsCard from "../../components/UserListingsCard";

const MyListings = () => {
  const [addListing, setAddListing] = useState(false);

  return (
    <div className="flex  w-[100%]">
      <div className="xl:w-[15%] hidden xl:block"></div>
      <div className="xl:w-[85%] w-[100%] pt-8 xl:px-4 px-5 relative">
        <div className="flex flex-col">
          <div className=" flex items-center justify-between">
            <h4 className="font-bold text-xl">My Listings</h4>
            <button
              className="btnmd py-3 flex items-center gap-2"
              onClick={() => {
                setAddListing(!addListing);
              }}
            >
              Add Listing <FaPlus />
            </button>
          </div>

          <div className="mt-12">
            <UserListingsCard />
          </div>
        </div>
        <div
          className={
            addListing
              ? "bg-black/50 h-[100vh] fixed top-[89px] z-10 w-[100vw] left-0"
              : "hidden"
          }
        ></div>
        <div
          className={
            addListing ? "absolute top-0 left-[50%] ml-[-350px] z-20" : "hidden"
          }
        >
          <UploadApartments
            closeUploadProperty={() => {
              setAddListing(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyListings;
