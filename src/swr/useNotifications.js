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

export const useNotifications = (user) => {
  const { data, error } = useSWR(
    `https://waafzskqomubrdnhnpzh.supabase.co/rest/v1/notifications?select=*,trigger_id(*)&recipient_id=eq.${user.id}&order=created_at.desc`,
    fetcher,
   /*  { refreshInterval: 5000 } */
  );
  return { data, error };
};
