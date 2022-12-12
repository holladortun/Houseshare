import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  storage: window.localStorage,
  key: "recoilUserProfile",
});

export const userProfileState = atom({
  key: "userProfileState",
  default: null,
effects_UNSTABLE: [persistAtom],
});
