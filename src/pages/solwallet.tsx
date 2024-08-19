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
    const [addresses, setAddresses] = useState([]);

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
                setAddresses([...addresses, keypair.publicKey.toBase58()]);
            }}>Generate SOL Wallet</Button>

            {addresses.map((a, i) => (<div>
                <Typography key={i}>{a}</Typography>
            </div>
            ))}
        </div>
    );
};
