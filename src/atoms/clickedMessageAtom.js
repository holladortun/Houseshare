import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";


/* const { persistAtom } = recoilPersist({
  storage: window.localStorage,
  key: "recoilclickedMessage",
}); */

export const clickedMessageState = atom({
  key: "clickedMessageState",
  default: [],
 // effects_UNSTABLE: [persistAtom],
});
