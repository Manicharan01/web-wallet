import { Button, Card, TextField, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { emailSelector } from "./api/store/selectors/email";
import { seedSelector } from "./api/store/selectors/seed";
import { mnemonicSelector } from "./api/store/selectors/mnemonic";
import { useRouter } from 'next/router';

export default function Mnenomic() {
    const router = useRouter();
    const userEmail = useRecoilValue(emailSelector) as string;
    const userSeed = useRecoilValue(seedSelector) as string;
    const userMnemonic = useRecoilValue(mnemonicSelector) as string;
    const userMnemonicArray = userMnemonic.split(" ");
    return <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}>
        <Card style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
            margin: "1rem",
            width: 400,
        }}>
            <Typography variant="h4">Mnenomic</Typography>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                margin: "1rem",
                width: "100%",
            }}>
                <Typography variant="subtitle1">1. {userMnemonicArray[0]}</Typography>
                <Typography variant="subtitle1">2. {userMnemonicArray[1]}</Typography>
                <Typography variant="subtitle1">3. {userMnemonicArray[2]}</Typography>
                <Typography variant="subtitle1">4. {userMnemonicArray[3]}</Typography>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                margin: "1rem",
                width: "100%",
            }}>
                <Typography variant="subtitle1">5. {userMnemonicArray[4]}</Typography>
                <Typography variant="subtitle1">6. {userMnemonicArray[5]}</Typography>
                <Typography variant="subtitle1">7. {userMnemonicArray[6]}</Typography>
                <Typography variant="subtitle1">8. {userMnemonicArray[7]}</Typography>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                margin: "1rem",
                width: "100%",
            }}>
                <Typography variant="subtitle1">9. {userMnemonicArray[8]}</Typography>
                <Typography variant="subtitle1">10. {userMnemonicArray[9]}</Typography>
                <Typography variant="subtitle1">11. {userMnemonicArray[10]}</Typography>
                <Typography variant="subtitle1">12. {userMnemonicArray[11]}</Typography>
            </div>
            <Button variant="contained" color="primary" onClick={() => {
                navigator.clipboard.writeText(userMnemonic)
                router.push("/dashboard")
            }}>Copy</Button>
        </Card>
    </div>;
};
