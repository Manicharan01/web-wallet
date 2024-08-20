import { useState } from 'react';
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import { useRecoilValue } from 'recoil';
import { mnemonicSelector } from './api/store/selectors/mnemonic';
import { Button, Typography } from '@mui/material';

export const SolWallet = () => {
    const mnemonic = useRecoilValue(mnemonicSelector) as string;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([{ address: '', balance: '' }]);

    return (
        <div>
            <Typography variant="h4">Solana Wallet</Typography>
            <Button variant='contained' onClick={async () => {
                const seed = mnemonicToSeedSync(mnemonic);
                const derivationPath = `m/44'/501'/${currentIndex}'/0'`;
                const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
                const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
                const keypair = Keypair.fromSecretKey(secret);
                setCurrentIndex(currentIndex + 1);

                await fetch('https://solana-mainnet.g.alchemy.com/v2/9exH_3EB8W4xlH_SWQirrfjqCOtB17Dj', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        id: 1,
                        method: 'getBalance',
                        params: [keypair.publicKey.toBase58()],
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data.result.value)
                        setAddresses([...addresses, { address: keypair.publicKey.toBase58(), balance: String(Number(data.result.value)) }]);

                    });
            }}>Generate SOL Wallet</Button>

            {
                addresses.map((address) => (<div>
                    <Typography>{address.address} {address.balance}</Typography>
                </div>
                ))
            }
        </div >
    );
};
