import React from "react";
import PropertyCard from "./PropertyCard";
import SectionHeader from "./SectionHeader";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

import { useRecoilState } from "recoil";

const Popular = () => {
  return (
    <div className="px-[20px] md:px-[40px]  2xl:px-[100px] py-10">
      <SectionHeader subtitle="featured" title="featured apartments" />
      <div>
        <PropertyCard />
      </div>

      <a href="#"></a>
    </div>
  );
};

export default Popular;
