import { selector } from "recoil";
import { seedState } from "../atoms/seed";

export const seedSelector = selector<string>({
  key: "seedSelector",
  get: ({ get }) => {
    const seed = get(seedState);
    return seed;
  },
});
