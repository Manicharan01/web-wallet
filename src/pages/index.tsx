import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { Email, emailState } from "./api/store/atoms/email";
import { useRecoilState } from "recoil";

export default function Home() {
    const [email, setEmail] = useState("");
    const router = useRouter();
    const [userEmail, setUserEmail] = useRecoilState(emailState);
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <div>
                <Typography variant="h4">Welcome to Something Wallet</Typography>
            </div>
            <Card style={{
                padding: "20px",
                margin: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Typography variant="h6">Enter your email to generate a mnemonic</Typography>
                <TextField type="email" fullWidth={true} label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button variant="contained" color="primary" onClick={async () => {
                    await fetch("http://localhost:3000/api/mnemonic", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ newEmail: email }),
                    }).then((res) => res.json()).then((data) => {
                        const user: Email = { email };
                        setUserEmail(user);
                        alert(data.message);
                        router.push("/seed");
                    });
                }}>Create Seed</Button>
            </Card>
        </div>
    );
}
