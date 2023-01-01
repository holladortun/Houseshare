import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
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

ReactDOM.createRoot(document.getElementById("roo")).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <SWRConfig value={{ provider: () => new Map() }}>
          <App />
        </SWRConfig>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);

//
