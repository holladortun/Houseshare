import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

/* const { persistAtom } = recoilPersist({
  storage: window.localStorage,
  key: "recoiluser",
});
 */
export const userState = atom({
  key: "userState",
  default: null,
 // effects_UNSTABLE: [persistAtom],
});
