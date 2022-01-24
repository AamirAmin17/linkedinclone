import { atom } from "recoil";

export const modalState = atom({
  key: "modalStateKey",
  default: false,
});
export const modalTypeState = atom({
  key: "modalTypeStateKey",
  default: "dropIn",
});
