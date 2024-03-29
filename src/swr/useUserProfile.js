import useSWR from "swr";
import axios from "axios";
const key = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

const fetcher = async (url) => {
  const res = await axios.get(url, {
    headers: {
      Accept: "application / vnd.pgrst.object + json",
      Authorization: `Bearer ${key}`,
      apikey: `${key}`,
    },
  });
  return res.data;
};

export const useUserProfile = (user) => {
  const { data, error, mutate } = useSWR(
    `https://waafzskqomubrdnhnpzh.supabase.co/rest/v1/profiles?id=eq.${user.id}&select=*,apartments(*)`,
    fetcher
  );
  return { data, error, mutate };
};
