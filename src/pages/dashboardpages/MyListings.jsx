import React from "react";
import PropertyCard from "../../components/PropertyCard";
import UploadApartments from "../../components/UploadApartments";
import { supabase } from "../../../supabaseClient";
import { useState, useEffect } from "react";
import UserListingsCard from "../../components/UserListingsCard";

const MyListings = () => {
  return (
    <div className="flex  w-[100%]">
      <div className="xl:w-[15%] hidden xl:block"></div>
      <div className="xl:w-[85%] w-[100%] pt-8 xl:px-4 px-5 ">
        <div>
          <h4 className="font-bold text-xl mb-8">My Listings</h4>
        </div>
        <div>
          <UserListingsCard />
          <h4 className="font-bold xl:text-center text-2xl mt-12 ">
            Add New Listing
          </h4>
          <UploadApartments />
        </div>
      </div>
    </div>
  );
};

export default MyListings;
