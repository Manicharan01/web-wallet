import { useRecoilValue } from "recoil";
import { EthWallet } from "./ethwallet";
import { SolWallet } from "./solwallet";
import { mnemonicSelector } from "./api/store/selectors/mnemonic";
import { Typography } from "@mui/material";

export default function Dashboard() {
    const mnemonic = useRecoilValue(mnemonicSelector) as string;
    return <div>
        <EthWallet />
        <SolWallet />
    </div>;
}
