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
export const useProperties = () => {
  const { data, error } = useSWR(
    `https://waafzskqomubrdnhnpzh.supabase.co/rest/v1/apartments?select=*,profiles(*)&order=id.desc`,
    fetcher
  );
  return { data, error };
};
