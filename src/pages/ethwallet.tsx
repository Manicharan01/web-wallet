import { useState } from 'react';
import { Wallet, HDNodeWallet } from 'ethers';
import { useRecoilValue } from 'recoil';
import { mnemonicSelector } from './api/store/selectors/mnemonic';
import { Button, Typography } from '@mui/material';
import { mnemonicToSeedSync } from 'bip39';

export const EthWallet = () => {
    const mnemonic = useRecoilValue(mnemonicSelector) as string;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([{ address: '', balance: '' }]);

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

                await fetch('https://eth-mainnet.g.alchemy.com/v2/9exH_3EB8W4xlH_SWQirrfjqCOtB17Dj', {
                    method: 'POST',
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        id: 1,
                        method: 'eth_getBalance',
                        params: [wallet.address, 'latest'],
                    }),
                }).then((res) => res.json()).then((data) => {
                    console.log(data.result);
                    setAddresses([...addresses, { address: wallet.address, balance: String(Number(data.result)) }]);
                });
            }}>Generate ETH Wallet</Button>

            {addresses.map((user) => (<div>
                <Typography>{user.address} {user.balance}</Typography>
            </div>
            ))}
        </div>
    );
};
