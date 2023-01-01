import useSWR from "swr";
import { supabase } from "../../supabaseClient";

export const useSession = async () => {
  const { data, error } = await supabase.auth.getSession();
/*     
  if (data) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);
    return { data, user };
  } else {
    return error;
  } */

  /* const { data: sessionData, error } = useSWR(
    `https://waafzskqomubrdnhnpzh.supabase.co/rest/v1/apartments`
  );
  return { sessionData, error }; */
};
