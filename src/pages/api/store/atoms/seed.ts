import { atom } from "recoil";

export const seedState = atom<string>({
  key: "seedState",
  default: "",
});
