import { atom, selector } from "recoil";

export const newsState = atom({
  key: "newsStateKey",
  default: [],
});

export const newsStateSelector = selector({
  key: "newsStateSelectorKey",
  get: ({ get }) => {
    const getAtom = get(newsState);
    const filter = getAtom.slice(0, 5);
    return filter;
  },
});
