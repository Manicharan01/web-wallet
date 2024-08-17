import { generateMnemonic, mnemonicToSeed } from "bip39";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { useRecoilState } from "recoil";
import { Email, emailState } from "./store/atoms/email";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [email, setEmail] = useRecoilState(emailState);
  if (req.method === "POST") {
    const { newEmail } = req.body;
    const data: Email = { email: newEmail };
    setEmail(data);
    const mnemonic = generateMnemonic();
    const seed = await mnemonicToSeed(mnemonic);
    const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
    users[newEmail] = { mnemonic, seed, newEmail };
    fs.writeFileSync("./users.json", JSON.stringify(users));
    res.status(200).json({ message: "Mnemonic generated successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
