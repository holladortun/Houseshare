import { atom } from "recoil";


/* const { persistAtom } = recoilPersist({
  key: "recoil-persist", // this key is using to store data in local storage
  storage: localStorage,
});
 */
export const mobileDrawerState = atom({
  key: "mobileDrawerState",
  default: false,

});
