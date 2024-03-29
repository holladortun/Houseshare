import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  storage: window.localStorage,
  key: "recoilauth",
});

export const authSessionState = atom({
  key: "authSessionState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
