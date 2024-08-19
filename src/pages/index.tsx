import { Button, Card, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
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
                width: "400px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <Button variant="contained" color="primary" onClick={() => router.push("/login")}>Log In</Button>
                <Button variant="contained" color="primary" onClick={() => router.push("/signup")}>Sign Up</Button>
            </Card>
        </div>
    );
}
