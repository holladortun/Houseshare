import useSWR from "swr";
import axios from "axios";
const key = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

const fetcher = async (url) => {
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${key}`,
      apikey: `${key}`,
    },
  });
  return res.data;
};

export const useMessages = (user) => {
  const { data, error } = useSWR(
    `https://waafzskqomubrdnhnpzh.supabase.co/rest/v1/messages?select=*,sender_id(*),apartments(propertyimageurl)&receiver_id=eq.${user.id}&read=eq.no&order=created_at.desc`,
    fetcher,
    { refreshInterval: 5000 }
  );
  return { data, error };
};
