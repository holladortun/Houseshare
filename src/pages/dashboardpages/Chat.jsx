import React from "react";
import Test from "./Test";
import chatimgone from "../../../public/chatimg.jpg";
import chatimgtwo from "../../../public/chatimagetwo.jpg";
import { RiSendPlaneFill } from "react-icons/ri";
import { supabase } from "../../../supabaseClient";
import { useState } from "react";
import { userProfileState } from "../../atoms/userProfile";
import { useRecoilValue } from "recoil";

const Chat = () => {
  const [userMessage, setUserMessage] = useState("");
  const [sentMessage, setSentMessage] = useState(null);
  const [messagesList, setMessagesList] = useState([]);

  const userProfile = useRecoilValue(userProfileState);

  let user_id;

  if (userProfileState) {
    user_id = userProfile.id;
  }

  supabase
    .channel("public:messages")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "messages" },
      (payload) => {
        console.log("Change received!", payload);
        setSentMessage(payload.new?.message_text);
      }
    )
    .subscribe();
  console.log(sentMessage);

  if (sentMessage) {
    setMessagesList([...messagesList, sentMessage]);
    console.log(messagesList);
    setSentMessage("");
  }

  const sendMessage = async () => {
    try {
      const { error } = await supabase.from("messages").insert({
        message_text: userMessage,
        sender_id: user_id,
      });

      if (error) throw error;
    } catch (error) {
      alert(error.message || error.description);
    } finally {
      setUserMessage("");
    }
  };

  return (
    <div className="flex w-[100%]">
      <div className="xl:w-[15%] hidden xl:block"></div>
      <div className="xl:w-[85%] w-[100%] pt-8 xl:px-4 px-5 ">
        <div>
          <h4 className="font-bold text-xl mb-8">My chats</h4>
        </div>
        <div className="container max-w-[900px] bg-white mx-auto rounded-md shadow-md relative py-5">
          <div className=" overflow-scroll h-[600px] p-8">
            {/* Sender design */}
            {/*  <div className="flex gap-2">
              <div className="w-[8%]">
                <img
                  src={chatimgone}
                  alt=""
                  className="rounded-full w-12 h-12 "
                />
              </div>
              <div className="flex flex-col items-start w-[92%] flex-wrap ">
                <p className="bg-[#7e7e7e] p-2 text-white mb-2  max-w-[80%] rounded-md text-[18px]">
                  How are you today? Wanted to know if you are available today.
                  Can we see todY
                </p>
                <p className="bg-[#7e7e7e] p-2 text-white mb-2  max-w-[80%] rounded-md text-[18px]">
                  How are you today? Wanted to know if you are available today.
                  Can we see todY
                </p>
                <p className="bg-[#7e7e7e] p-2 text-white mb-2  max-w-[80%] rounded-md text-[18px]">
                  How are you today? Wanted to know if you are available today.
                  Can we see today
                </p>
              </div>
            </div>
 */}
            {/* reciever chat designer */}
            {/*  <div className="flex   gap-2 mt-8">
              <div className="w-[8%] order-2 justify-self-end flex justify-end ">
                <img
                  src={chatimgtwo}
                  alt=""
                  className="rounded-full w-12 h-12 "
                />
              </div>
              <div className="flex flex-col items-end w-[92%] flex-wrap ">
                <p className="bg-[#444CE7] p-2 text-white mb-2  max-w-[80%] rounded-md text-[18px]">
                  How are you today? Wanted to know if you are available today.
                  Can we see todY
                </p>
                <p className="bg-[#444CE7] p-2 text-white mb-2  max-w-[80%] rounded-md text-[18px]">
                  How are you today? Wanted to know if you are available today.
                  Can we see todY
                </p>
                <p className="bg-[#444CE7] p-2 text-white mb-2  max-w-[80%] rounded-md text-[18px]">
                  How are you today? Wanted to know if you are available today.
                  Can we see today
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-[8%]">
                <img
                  src={chatimgone}
                  alt=""
                  className="rounded-full w-12 h-12 "
                />
              </div>
              <div className="flex flex-col items-start w-[92%] flex-wrap ">
                <p className="bg-[#7e7e7e] p-2 text-white mb-2  max-w-[80%] rounded-md text-[18px]">
                  How are you today? Wanted to know if you are available today.
                  Can we see todY
                </p>
                <p className="bg-[#7e7e7e] p-2 text-white mb-2  max-w-[80%] rounded-md text-[18px]">
                  How are you today? Wanted to know if you are available today.
                  Can we see todY
                </p>
                <p className="bg-[#7e7e7e] p-2 text-white mb-2  max-w-[80%] rounded-md text-[18px]">
                  How are you today? Wanted to know if you are available today.
                  Can we see today
                </p>
              </div>
            </div> */}

            {/* <div className="flex   gap-2 mt-8">
              <div className="w-[8%] order-2 justify-self-end flex justify-end ">
                <img
                  src={chatimgtwo}
                  alt=""
                  className="rounded-full w-12 h-12 "
                />
              </div>
              <div className="flex flex-col items-end w-[92%] flex-wrap ">
                <p className="bg-[#444CE7] p-2 text-white mb-2  max-w-[80%] rounded-md text-[18px]">
                  How are you today? Wanted to know if you are available today.
                  Can we see todY
                </p>
                <p className="bg-[#444CE7] p-2 text-white mb-2  max-w-[80%] rounded-md text-[18px]">
                  How are you today? Wanted to know if you are available today.
                  Can we see todY
                </p>
                <p className="bg-[#444CE7] p-2 text-white mb-2  max-w-[80%] rounded-md text-[18px]">
                  How are you today? Wanted to know if you are available today.
                  Can we see today
                </p>
              </div>
            </div> */}
            { messagesList.length > 0 &&
              <div className="flex gap-2 mt-8 mb-12">
                <div className="w-[8%] order-2 justify-self-end flex justify-end ">
                  <img
                    src={chatimgtwo}
                    alt=""
                    className="rounded-full w-12 h-12 "
                  />
                </div>
                <div className="flex flex-col items-end w-[92%] flex-wrap ">
                  {messagesList.map((message) => {
                    return (
                      <p className="bg-[#444CE7] p-2 text-white mb-2  max-w-[80%] rounded-md text-[18px]">
                        {message}
                      </p>
                    );
                  })}
                </div>
              </div>
            }
          </div>

          {/* user input */}
          <div className="w-full absolute bottom-0 px-8 py-2 flex items-center justify-between rounded-sm">
            <input
              type="text"
              className="w-[90%] border-none  shadow-md p-2 h-12 "
              placeholder="Start typing your message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <RiSendPlaneFill
              className="bg-brandblue text-white rounded-full text-[45px] p-2 cursor-pointer"
              onClick={sendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
