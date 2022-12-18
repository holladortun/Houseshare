import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img from "../../public/exterior-05.jpg";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { propertyDataState } from "../atoms/propertyDataAtom";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ChatButton from "../components/ChatButton";

const SingleProperty = () => {
  const { listing_id } = useParams();

  const properties = useRecoilValue(propertyDataState);

  const singleProperty = properties.find((property) => {
    return property.id == listing_id;
  });
  console.log(singleProperty);

  return (
    <div>
      <Navbar />
      {}
      <div className="container max-w-[1300px] mx-auto px-[20px] md:px-[40px] 2xl:px-[100px] py-16 ">
        <div>
          {(
            <img
              src={singleProperty?.propertyimageurl}
              alt=""
              className="text-center rounded-md"
            />
          ) || <Skeleton />}
        </div>

        <ChatButton author_id= {singleProperty?.author_id}/>
      </div>
      <Footer />
    </div>
  );
};

export default SingleProperty;
