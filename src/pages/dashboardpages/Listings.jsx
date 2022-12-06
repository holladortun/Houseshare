import React from "react";
import PropertyCard from "../../components/PropertyCard";
import UploadApartments from "../../components/UploadApartments";
import { supabase } from "../../../supabaseClient";
import { useState, useEffect } from "react";

const Listings = () => {
  return (
    <div className="flex  h-[100vh]  w-[100%]">
      <div className="w-[20%]"></div>
      <div className="w-[80%] pt-4 pl-4">
        <div>
          <h4 className="font-bold text-xl mb-8">My Listings</h4>
        </div>
        <div>
          <PropertyCard />
         
        </div>
      </div>
    </div>
  );
};

export default Listings;
