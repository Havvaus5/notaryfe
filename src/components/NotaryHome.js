import React, { useEffect, useState, useMemo } from 'react';
import { getWeb3, getRealEstateContract, getRealEstateOwnerRelationContract, getErrorMessage, getRealEstateSaleAd } from '../ethereum/utils';
import { Button, Message } from 'semantic-ui-react'
import RealEstateHissedarEkle from './admin/RealEstateHissedarEkle';
import { useParams } from 'react-router-dom'
import { HISSEDAR_EKLE_URL, REAL_ESTATE_EKLE_URL, USER_HISSE_PAGE } from './util';
import RealEstateEkle from './admin/RealEstateEkle';
import NotFound from './NotFound';
import UserHisseList from './user/UserHisseList';

function NotaryHome(props) {
    const realEstateContractAdd = '0x371b15901cc2B757a06d9D5Da5441Ee16f6b9000';
    const realEstateOwnerRelationAdd = '0x9ef7ebae5904FC856465d8f505bc2244defe3201';
    const realEstateSaleAdContractAdd = '0x7694DD262005Af61b2e37914476caaaB3b4e6744';
    const web3 = useMemo(() => getWeb3(), [])
    const [currentAccount, setCurrentAccount] = useState(null);
    const [networkId, setNetworkId] = useState(null);

    const { adressName } = useParams();
    useEffect(() => {
        getRealEstateSaleAd(web3);
        if (!currentAccount) return;

    }, [web3, currentAccount, networkId]);

    async function connectWallet() {
        const accounts = await web3.eth.requestAccounts();
        setCurrentAccount(accounts[0]);
    }

    async function getCurrentConnectedAccount() {
        const accounts = await web3.eth.getAccounts();
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

    async function addHissedarRealEstate(realEstateHissedarInfo) {
        const contract = getRealEstateOwnerRelationContract(web3, realEstateOwnerRelationAdd);
        try {
            await contract.methods.addOwnerShip(realEstateHissedarInfo.ownAdd, realEstateHissedarInfo.realEstateId, realEstateHissedarInfo.hisse).send({ from: currentAccount })
                .once('receipt', function (receipt) {
                    console.log('Transaction receipt received', receipt)
                });
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function addRealEstate(realEstateInfo) {
        const contract = getRealEstateContract(web3, realEstateContractAdd);
        try {
            await contract.methods.addRealEstate(realEstateInfo.mahalle, realEstateInfo.payda).send({ from: currentAccount })
                .once('receipt', function (receipt) {
                    console.log('Transaction receipt received', receipt)
                });
        } catch (err) {
            console.log(err.message);
        }
    }

    async function getHisses(){
        const contract = getRealEstateOwnerRelationContract(web3, realEstateOwnerRelationAdd);
        try {
            const ownerHisseInfos = await contract.methods.getHisseInfos(currentAccount).call();
            return ownerHisseInfos;
        } catch (err) {
            console.log(err.message);
        }
    }

    const getRenderedComponent = () => {
        if (adressName === HISSEDAR_EKLE_URL) {
            return <RealEstateHissedarEkle hissedarEkle={addHissedarRealEstate} />;
        } else if (adressName === REAL_ESTATE_EKLE_URL) {
            return <RealEstateEkle addRealEstate={addRealEstate} />;
        } else if (adressName === USER_HISSE_PAGE) {
            return <UserHisseList userAccount={currentAccount} getHisses={getHisses} />;
        }
        else {
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
