import { Card, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import fs from "fs";
import { emailSelector } from "./api/store/selectors/email";

export default async () => {
    const userEmail = useRecoilValue(emailSelector);
    const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
    const user = users[userEmail];
    const mnemonic = user.mnemonic;
    const mnemonicArray = mnemonic.split(" ");
    return <div>
        <Card>
            <Typography variant="h6">1. {mnemonicArray[0]}</Typography>
            <Typography variant="h6">2. {mnemonicArray[1]}</Typography>
            <Typography variant="h6">3. {mnemonicArray[2]}</Typography>
            <Typography variant="h6">4. {mnemonicArray[3]}</Typography>
            <Typography variant="h6">5. {mnemonicArray[4]}</Typography>
            <Typography variant="h6">6. {mnemonicArray[5]}</Typography>
            <Typography variant="h6">7. {mnemonicArray[6]}</Typography>
            <Typography variant="h6">8. {mnemonicArray[7]}</Typography>
            <Typography variant="h6">9. {mnemonicArray[8]}</Typography>
            <Typography variant="h6">10. {mnemonicArray[9]}</Typography>
            <Typography variant="h6">11. {mnemonicArray[10]}</Typography>
            <Typography variant="h6">12. {mnemonicArray[11]}</Typography>
        </Card>
    </div>;
};
