import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  storage: window.localStorage,
  key: "recoilmessages",
});

export const messagesState = atom({
  key: "messagesState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
