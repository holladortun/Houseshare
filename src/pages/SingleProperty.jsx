import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img from "../../public/exterior-05.jpg";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { propertyDataState } from "../atoms/propertyDataAtom";
import { useEffect, useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  FaBath,
  FaMale,
  FaBed,
  FaMapMarkerAlt,
  FaFemale,
} from "react-icons/fa";

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
import TimeAgo from "timeago-react";
import { MdEmail } from "react-icons/md";
import { BsTelephoneOutboundFill } from "react-icons/bs";
import emailjs from "@emailjs/browser";

import { GrClose } from "react-icons/gr";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { authSessionState } from "../atoms/authSessionAtom";
import { useProperties } from "../swr/useProperties";
import { useUserProfile } from "../swr/useUserProfile";

const SingleProperty = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [mailPopUp, setMailPopup] = useState(false);
  const [messageText, setMessageText] = useState("");
  const { listing_id } = useParams();
  //const userProfile = useRecoilValue(userProfileState);

  const [isLoading, setIsLoading] = useState(false);
  const authSession = useRecoilValue(authSessionState);
  const { data: propertyData } = useProperties();

  const {
    user: { id },
  } = JSON.parse(localStorage.getItem("sb-waafzskqomubrdnhnpzh-auth-token"));
  /*  const{data: userProfile} = useUserProfile(user)

  let id;

  if (userProfile) {
    id = userProfile.id;
  }
 */
  /*   useEffect(() => {
    authSession ? getBookmarks() : null;
  }, []);
 */
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

  const singleProperty = propertyData?.find((property) => {
    return property.id == listing_id;
  });

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

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { error } = await supabase.from("messages").insert({
        sender_id: id,
        receiver_id: singleProperty?.profiles.id,
        message_text: messageText,
        property_id: listing_id,
      });

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setMessageText("");
      setIsLoading(false);
      toast.success("Your message has been sent", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
        progressClassName: "custom-toast-progress",
      });
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

  console.log(singleProperty?.profiles);

  const handleOpenMessagePopUp = () => {
    authSession
      ? setMailPopup(!mailPopUp)
      : toast.success("Please log in to send a message", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
          progressClassName: "custom-toast-progress",
        });
  };

  return (
    <div>
      <Navbar />

      <div className="container max-w-[1300px] mx-auto px-[20px] md:px-[40px] 2xl:px-[100px] py-16 relative ">
        <div>
          <img
            src={singleProperty?.propertyimageurl}
            alt=""
            className="text-center rounded-md xl:h-[70vh] object-cover w-full"
          />
        </div>
        <div className="my-12 shadow-md py-8  xl:px-8 ">
          <div className="flex flex-col xl:flex-row items-center justify-between xl:gap-3 gap-6 pb-8 border-b border-black/10">
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
                  <h4 className=" text-[15px]">Bedrooms</h4>
                  <span className="flex items-center  gap-4 text-xl">
                    <FaBed className="text-xl text-brandblue" />
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
              <div>
                <div>
                  <h4 className=" text-[15px]">Preferred Roommate</h4>
                  <span className="flex items-center  gap-2 text-[17px]">
                    {singleProperty?.gender == "male" ? (
                      <FaMale className="text-xl text-brandblue" />
                    ) : (
                      <FaFemale className="text-xl text-brandblue" />
                    )}
                    {singleProperty?.gender}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-6 text-[#7f7f7f] text-[20px] items-center ">
              {/* {bookmarks?.includes(listing_id) || isBookmarked ? (
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
              )} */}

              <BsFillShareFill
                className="hover:text-brandblue cursor-pointer"
                id="shareproperty"
              />
              <Tooltip
                anchorId="shareproperty"
                content="share"
                className="text-[13px] bg-brandblue"
              />

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2">
                  <p className="text-[17px]">Listed</p>
                  <TimeAgo
                    datetime={singleProperty?.created_at}
                    className="text-brandblue font-bold text-[17px]"
                  />
                </span>
                <p className="text-[17px]">by</p>
                <p className="text-[17px]">
                  {singleProperty?.author_id == id
                    ? "You"
                    : singleProperty?.profiles.first_name}
                </p>
                <img
                  src={singleProperty?.profiles.profile_pictureurl}
                  alt=""
                  className="rounded-full w-12 h-12
               object-cover cursor-pointer"
                  id="profileimage"
                />
                <Tooltip
                  anchorId="profileimage"
                  content="View Profile"
                  className="text-[13px] bg-brandblue"
                />
              </div>
            </div>
          </div>
          <div className="my-8">
            <h4 className="text-brandblue  font-bold">Property Description</h4>
            <p className="text-[18px] mt-2 leading-[30px/]">
              {singleProperty?.description}
            </p>
          </div>
          <div className="my-8">
            <h4 className="text-brandblue  font-bold">Property Rent</h4>
            <span className="text-[18px] mt-2 leading-[30px/] font-bold flex gap-2 items-center">
              # {singleProperty?.amount}{" "}
              <p className="font-medium text-[17px]">per night</p>
            </span>
          </div>
          {singleProperty?.author_id == id ? null : (
            <div className="flex items-start gap-3">
              <a className="btnlg flex items-center gap-2 text-[15px]" href="#">
                Call Now{" "}
                <BsTelephoneOutboundFill className="text-[15px] font-light" />
              </a>
              <button
                className="btnlg flex items-center gap-2 text-[15px]"
                onClick={handleOpenMessagePopUp}
              >
                Send Message <MdEmail className="text-[20px]" />
              </button>
            </div>
          )}
        </div>
        <div
          className={
            mailPopUp
              ? " absolute top-[50%] left-[50%] w-[550px] ml-[-275px] z-20 bg-white pt-6 pb-12 px-8 shadow-md rounded-md flex flex-col gap-4 transition-[top] ease-in duration-300"
              : "invisible absolute top-[55%] left-[50%] w-[400px] h-[400px] ml-[-200px] "
          }
        >
          <GrClose
            className="self-end text-brandblue text-[25px] cursor-pointer hover:scale-110 hover:transition-all ease-in duration-300"
            onClick={() => {
              setMailPopup(false);
            }}
          />
          <form onSubmit={sendMessage} className="flex flex-col gap-4 ">
            <label>Message</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            ></textarea>
            {isLoading ? (
              <button
                type="submit"
                className="btnlg cursor-pointer flex items-center justify-center gap-4"
              >
                <ClipLoader size={20} color="#fff" speedMultiplier={0.8} />
                Sending
              </button>
            ) : (
              <button
                type="submit"
                className="btnlg cursor-pointer flex items-center justify-center gap-4"
              >
                Send
              </button>
            )}
          </form>
        </div>
        <div
          className={
            mailPopUp
              ? "fixed top-0 left-0 bg-black/40 w-[100vw] h-[100vh]"
              : "invisible"
          }
        ></div>
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
