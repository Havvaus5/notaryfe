import React, { useEffect, useState, useMemo } from 'react';
import { getWeb3, getRealEstateContract, getRealEstateOwnerRelationContract, getErrorMessage } from '../../ethereum/utils';
import { Button, Message } from 'semantic-ui-react'
import RealEstateHissedarEkle from './RealEstateHissedarEkle';
import { useParams } from 'react-router-dom'
import { HISSEDAR_EKLE_URL, REAL_ESTATE_EKLE_URL } from '../util';
import RealEstateEkle from './RealEstateEkle';
import NotFound from '../NotFound';

function AdminHome(props) {
    const realEstateContractAdd = '0x764F7CCdd4F64B576A43CEfA63a4DDb9625d0AC6';
    const realEstateOwnerRelationAdd = '0xce09AE69263534B54E6F6AD44698619cBf0295bC';
    const web3 = useMemo(() => getWeb3(), [])
    const [currentAccount, setCurrentAccount] = useState(null);
    const [networkId, setNetworkId] = useState(null);

    const { adressName } = useParams();
    useEffect(() => {
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


    const getConnectWallet = () => {
        return (
            <>
                <Message info>
                    <Message.Header>Website is not connected to Ethereum</Message.Header>
                    <p>You need to connect your wallet first</p>
                </Message>
                <Button primary onClick={() => connectWallet()}>Connect Wallet</Button>
            </>
        )
    }

    const getRenderedComponent = () => {
        if (adressName === HISSEDAR_EKLE_URL) {
            return <RealEstateHissedarEkle hissedarEkle={addHissedarRealEstate} />;
        } else if (adressName === REAL_ESTATE_EKLE_URL) {
            return <RealEstateEkle addRealEstate={addRealEstate} />;
        } else {
            return <NotFound />;
        }
    }

    return (<>
        {!currentAccount ? getConnectWallet() : getRenderedComponent()}
    </>
    )
}

AdminHome.propTypes = {}

export default AdminHome
