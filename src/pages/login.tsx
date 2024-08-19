import { Button, TextField, Card, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { seedState } from './api/store/atoms/seed';
import { mnemonicState } from './api/store/atoms/mnemonic';
import { emailState } from './api/store/atoms/email';

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userEmail, setUserEmail] = useRecoilState(emailState);
    const [mnemonic, setMnemonic] = useRecoilState(mnemonicState);
    const [seed, setSeed] = useRecoilState(seedState)

    return (
        <div>
            < div style={{
                paddingTop: '150px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'center',
            }} >
                <Typography variant={"h6"}>
                    Welcome to Something Wallet
                </Typography>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Card variant="outlined" style={{
                    width: '400px',
                    padding: '20px',
                }}>
                    <TextField
                        fullWidth={true}
                        type="text"
                        label="Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <br /><br />
                    <TextField
                        fullWidth={true}
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <br /><br />
                    <Button
                        size={"large"}
                        variant="contained"
                        onClick={
                            async () => {
                                await fetch(`http://localhost:3000/api/login`, {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        username,
                                        password,
                                    }),
                                    headers: {
                                        "content-Type": "application/json",
                                    },
                                }).then((response) => {
                                    response.json().then((text) => {
                                        setUserEmail(text.username);
                                        setMnemonic(text.mnemonic);
                                        setSeed(text.seed);
                                        alert(text.message);
                                        router.push("/seed");

                                    })
                                });
                            }
                        }
                    >Log In</Button>
                </Card>
            </div>
        </div>
    )
};

