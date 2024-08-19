import { useState } from 'react';
import { Wallet, HDNodeWallet } from 'ethers';
import { useRecoilValue } from 'recoil';
import { mnemonicSelector } from './api/store/selectors/mnemonic';
import { Button, Typography } from '@mui/material';
import { mnemonicToSeedSync } from 'bip39';

export const EthWallet = () => {
    const mnemonic = useRecoilValue(mnemonicSelector) as string;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);

    return (
        <div>
            <Typography variant="h4">Ethereum Wallet</Typography>
            <Button variant='contained' onClick={async () => {
                const seed = mnemonicToSeedSync(mnemonic)
                const derivationPath = `m/44'/60'/${currentIndex}'/0'`
                const hdNode = HDNodeWallet.fromSeed(seed);
                const childNode = hdNode.derivePath(derivationPath);
                const privateKey = childNode.privateKey;
                const wallet = new Wallet(privateKey);
                setCurrentIndex(currentIndex + 1);
                setAddresses([...addresses, wallet.address]);
            }}>Generate ETH Wallet</Button>

            {addresses.map((a, i) => (<div>
                <Typography key={i}>{a}</Typography>
            </div>
            ))}
        </div>
    );
};
