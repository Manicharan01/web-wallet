import { atom } from "recoil";

export type Email = {
  email: string;
};

export const emailState = atom<Email>({
  key: "emailState",
  default: {
    email: "",
  },
});
