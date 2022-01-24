import { atom } from "recoil";

export const handlePostState = atom({
  key: "handlePostStateKey",
  default: false,
});
export const getPostState = atom({
  key: "getPostStateKey",
  default: {},
});
export const useSSRPostState = atom({
  key: "useSSRPostStateKey",
  default: true,
});
