import React, { useEffect, useState, useMemo } from 'react';
import { getOwnerContract, getWeb3, getErrorMessage } from '../ethereum/utils';
import { Button, Message } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import { HISSEDAR_EKLE_URL, ILANLAR, REAL_ESTATE_EKLE_URL, USER_HISSE_PAGE, USER_EKLE } from './util';
import RealEstateHissedarEkle from './admin/RealEstateHissedarEkle';
import RealEstateEkle from './admin/RealEstateEkle';
import NotFound from './NotFound';
import UserHisseList from './user/UserHisseList';
import Advertisements from './user/Advertisements';
import UserEkle from './admin/UserEkle';

function NotaryHome(props) {
    const web3 = useMemo(() => getWeb3(), [])
    const [currentAccount, setCurrentAccount] = useState(null);
    const [networkId, setNetworkId] = useState(null);
    const [adminFlag, setAdminFlag] = useState(null);
    const { adressName } = useParams();
    const ownerContract = getOwnerContract();

    useEffect(() => {
        if (currentAccount) {
            getUserRole();
        }
    }, [web3, currentAccount, networkId]);

    async function getUserRole() {
        try {
            const res = await ownerContract.methods.isAdmin(currentAccount).call();
            setAdminFlag(res);
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function connectWallet() {
        const accounts = await web3.eth.requestAccounts();
        setCurrentAccount(accounts[0]);
    }

    window.ethereum.on('accountsChanged', function (accounts) {
        if (accounts) {
            setCurrentAccount(accounts[0]);
        }
    })

    window.ethereum.on('networkChanged', function (networkId) {
        console.log("New network ID: ", networkId)
        setNetworkId(networkId)
    })

    const getRenderedComponent = () => {
        if (adressName === USER_EKLE) {
            return <UserEkle userAccount={currentAccount} web3={web3} isAdmin={adminFlag} />;
        } else if (adressName === HISSEDAR_EKLE_URL) {
            return <RealEstateHissedarEkle userAccount={currentAccount} web3={web3} isAdmin={adminFlag} />;
        } else if (adressName === REAL_ESTATE_EKLE_URL) {
            return <RealEstateEkle userAccount={currentAccount} web3={web3} isAdmin={adminFlag} />;
        } else if (adressName === USER_HISSE_PAGE) {
            return <UserHisseList userAccount={currentAccount} web3={web3} />;
        } else if (adressName === ILANLAR) {
            return <Advertisements userAccount={currentAccount} web3={web3} />;
        } else {
            return <NotFound />;
        }
    }

    return (<>
        {!currentAccount ? <>
            <Message info>
                <Message.Header>Website is not connected to Ethereum</Message.Header>
                <p>You need to connect your wallet first</p>
            </Message>
            <Button primary onClick={() => connectWallet()}>Connect Wallet</Button>
        </> : getRenderedComponent()}
    </>
    )
}


export default NotaryHome
