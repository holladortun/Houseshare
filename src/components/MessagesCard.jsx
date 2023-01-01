import React from "react";
import pic from "../../public/chatimg.jpg";
import home from "../../public/firsthome.jpg";
import TimeAgo from "timeago-react";
import { readMessagePopUpState } from "../atoms/readMessagePopUpAtom";
import { useRecoilValue } from "recoil";
import { messagesState } from "../atoms/messagesAtom";

const MessagesCard = ({ message, handleReadMessage }) => {
  const {
    message_text,
    created_at,
    id,
    sender_id: { profile_pictureurl, first_name, last_name },
    apartments: { propertyimageurl },
  } = message;

  const messages = useRecoilValue(messagesState);

  return (
    <div className="px-5 py-5 flex gap-2 relative">
      <div className="flex items-start gap-4 md:w-[78%] w-[100%]">
        <div className="md:w-[15%] w-[15%]">
          <img
            src={profile_pictureurl}
            alt=""
            className="rounded-full w-12 h-12 object-cover "
          />
        </div>
        <div className="flex flex-col gap-4 ">
          <div>
            <p>
              <TimeAgo
                className="text-black/50 text-[14px]"
                datetime={created_at}
                locale="EN_US"
              />
            </p>
            <h4 className="font-bold text-black text-[17px]">
              {`${first_name} ${" "} ${last_name}`}
            </h4>
            <p className="text-[16px]">
              {message_text.length > 35
                ? message_text.slice(0, 35) + "..."
                : message_text}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className=" text-[17px] text-black border px-5 rounded-lg bg-[#E5E7EB]">
              Ignore
            </button>
            <button
              className="text-[17px] bg-brandblue text-white px-5 rounded-lg"
              onClick={() => handleReadMessage(id)}
            >
              Read
            </button>
          </div>
        </div>
      </div>
      <div className="w-[22%] hidden md:block">
        <img
          src={propertyimageurl}
          alt=""
          className="rounded-md h-[100px] object-cover"
        />
      </div>
    </div>
  );
};

export default MessagesCard;
