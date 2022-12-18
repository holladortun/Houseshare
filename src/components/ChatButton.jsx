import React from "react";
import { userProfileState } from "../atoms/userProfile";
import { propertyDataState } from "../atoms/propertyDataAtom";
import { useRecoilValue } from "recoil";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const ChatButton = ({ author_id }) => {
  const loggedInUser = useRecoilValue(userProfileState);
  let id;

 const navigate = useNavigate();

  if (loggedInUser) {
    id = loggedInUser.id;
  }
  console.log(id);
  console.log(author_id);

  const handleClick = async () => {
    try {
      const { error } = await supabase
        .from("messages")
        .insert({
          message_text: "Hello, I will like to enquire about your property",
          sender_id: id,
          reciever_id: author_id,
        });

      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/account/chat");
    }
  };

  return (
    <div>
      <button onClick={handleClick} className="btnlg">
        Chat Now
      </button>
    </div>
  );
};

export default ChatButton;
