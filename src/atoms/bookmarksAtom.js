import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  storage: window.localStorage,
  key: "recoilbookmarks",
});

export const bookmarksState = atom({
  key: "bookmarksState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
