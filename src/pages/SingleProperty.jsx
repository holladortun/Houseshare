import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img from "../../public/exterior-05.jpg";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { propertyDataState } from "../atoms/propertyDataAtom";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaBath } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import {
  BsFillShareFill,
  BsFillBookmarkFill,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { bookmarksState } from "../atoms/bookmarksAtom";
import { useRecoilState } from "recoil";
import { list } from "postcss";
import { userProfileState } from "../atoms/userProfile";
import { supabase } from "../../supabaseClient";

const SingleProperty = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  const { listing_id } = useParams();
  const userProfile = useRecoilValue(userProfileState);

  let id;
  let refetch;

  if (userProfile) {
    id = userProfile.id;
  }

  useEffect(() => {
    getBookmarks();
  }, []);

  const getBookmarks = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("bookmarks")
        .eq("id", id)
        .single();
      if (error) throw error;

      setBookmarks(data.bookmarks);
    } catch (error) {
      alert(error.message);
    }
  };

  console.log(bookmarks);
  const properties = useRecoilValue(propertyDataState);

  const singleProperty = properties.find((property) => {
    return property.id == listing_id;
  });

  /* bookmarks.includes(listing_id)
    ? setIsBookmarked(true)
    : setIsBookmarked(false);
 */
  console.log(singleProperty);
  console.log(bookmarks);
  const addBookmark = async () => {
    try {
      setIsBookmarked(!isBookmarked);
      const { data, error } = await supabase
        .from("profiles")
        .upsert([{ id: id, bookmarks: [...bookmarks, listing_id] }]);

      if (error) {
        console.log(error);
      } else {
      }
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  };

  const deleteBookmark = async () => {
    try {
      setIsBookmarked(!isBookmarked);
      const { data, error } = await supabase.from("profiles").upsert([
        {
          id: id,
          bookmarks: bookmarks.filter((bookmark) => bookmark != listing_id),
        },
      ]);

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
    }
  };

  supabase
    .channel("public:profiles")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "profiles" },
      (payload) => {
        console.log("Change received!", payload);
      }
    )
    .subscribe();

  return (
    <div>
      <Navbar />
      {}
      <div className="container max-w-[1300px] mx-auto px-[20px] md:px-[40px] 2xl:px-[100px] py-16 ">
        <div>
          <img
            src={singleProperty?.propertyimageurl}
            alt=""
            className="text-center rounded-md xl:h-[70vh] object-cover w-full"
          />
        </div>
        <div className="flex flex-col xl:flex-row items-center justify-between xl:gap-3 gap-6 my-12 shadow-md  xl:p-8 p-4">
          <div className="flex  gap-6">
            <div>
              <div>
                <h4 className=" text-[15px]">Bathrooms</h4>
                <span className="flex items-center  gap-4 text-xl">
                  <FaBath className="text-xl text-brandblue" />
                  {singleProperty?.bathrooms}
                </span>
              </div>
            </div>
            <div>
              <div>
                <h4 className=" text-[15px]">Bathrooms</h4>
                <span className="flex items-center  gap-4 text-xl">
                  <FaBath className="text-xl text-brandblue" />
                  {singleProperty?.bedrooms}
                </span>
              </div>
            </div>
            <div>
              <div>
                <h4 className=" text-[15px]">Location</h4>
                <span className="flex items-center  gap-2 text-[17px]">
                  <FaMapMarkerAlt className="text-xl text-brandblue" />
                  {singleProperty?.location}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-6 text-[#7f7f7f] text-[20px] ">
            {bookmarks?.includes(listing_id) || isBookmarked ? (
              <>
                <BsFillBookmarkCheckFill
                  className="hover:text-brandblue  cursor-pointer text-brandblue"
                  id="removeBookmark"
                  onClick={deleteBookmark}
                />
                <Tooltip
                  anchorId="removeBookmark"
                  content="Remove"
                  className="text-[13px] bg-brandblue"
                />
              </>
            ) : (
              <>
                <BsFillBookmarkFill
                  className="hover:text-brandblue  cursor-pointer"
                  id="bookmark"
                  onClick={addBookmark}
                />
                <Tooltip
                  anchorId="bookmark"
                  content="Bookmark"
                  className="text-[13px] bg-brandblue"
                />
              </>
            )}

            <BsFillShareFill
              className="hover:text-brandblue cursor-pointer"
              id="shareproperty"
            />
            <Tooltip
              anchorId="shareproperty"
              content="share"
              className="text-[13px] bg-brandblue"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleProperty;
{
  /* <WhatsappShareButton url="http://127.0.0.1:5173/listings/103">
              <WhatsappIcon />
            </WhatsappShareButton> */
}
