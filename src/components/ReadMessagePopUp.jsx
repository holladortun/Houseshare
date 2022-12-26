import React from "react";
import { readMessagePopUpState } from "../atoms/readMessagePopUpAtom";
import { useRecoilValue } from "recoil";
import { GrClose } from "react-icons/gr";
import { supabase } from "../../supabaseClient";
import { useSetRecoilState, useRecoilState } from "recoil";
import { messagesState } from "../atoms/messagesAtom";
import { clickedMessageState } from "../atoms/clickedMessageAtom";

import { useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const ReadMessagePopUp = () => {
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const readMessagePopUp = useRecoilValue(readMessagePopUpState);
  const messages = useSetRecoilState(messagesState);

  const setReadMessagePopUp = useSetRecoilState(readMessagePopUpState);
  const [clickedMessage] = useRecoilValue(clickedMessageState);

  console.log(clickedMessage);

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { error } = await supabase.from("messages").insert({
        sender_id: clickedMessage.receiver_id,
        receiver_id: clickedMessage?.sender_id.id,
        message_text: messageText,
        property_id: clickedMessage.property_id,
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

  const handleClosePopup = () => {
    setReadMessagePopUp(false);
    const readMessage = messages.filter((message) => {
      return message.id == id;
    });
    useSetRecoilState(messages);
  };

  return (
    <div >
      <div
        className={
          readMessagePopUp
            ? " fixed w-[90%] left-0 right-0 mx-auto top-[15%] md:top-[20%] md:left-[50%] md:w-[550px] md:ml-[-275px] z-20 bg-white pt-6 pb-12 md:px-8 px-4 shadow-md rounded-md flex flex-col gap-4 transition-[top] ease-in duration-300"
            : "invisible absolute top-[40%] left-[50%] w-[400px] h-[400px] ml-[-200px] "
        }
      >
        <GrClose
          className="self-end text-brandblue text-[25px] cursor-pointer hover:scale-110 hover:transition-all ease-in duration-300"
          onClick={() => {
            setReadMessagePopUp(false);
          }}
        />
        <div>
          <h4>Received From</h4>
          <p className="text-[17px] mt-2">
            {clickedMessage?.sender_id.first_name}
          </p>
        </div>
        <div>
          <h4>Message</h4>
          <p className="text-[17px] mt-2">{clickedMessage?.message_text}</p>
        </div>

        <form className="flex flex-col gap-4 " onSubmit={sendMessage}>
          {/* <label>Name</label>
            <input type="text" name="user_name" placeholder="Your Name" /> */}
          {/*  <label>Email</label>
            <input type="email" name="user_email" placeholder="Your Email" /> */}
          <label>Reply</label>
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value);
            }}
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
          readMessagePopUp
            ? "fixed top-0 left-0 bg-black/80 w-[100vw] h-[100vh]"
            : "invisible"
        }
      ></div>
    </div>
  );
};

export default ReadMessagePopUp;
