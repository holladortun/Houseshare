import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  storage: window.localStorage,
  key: "recoilnotifications",
});

export const notificationsState = atom({
  key: "notificationsState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
