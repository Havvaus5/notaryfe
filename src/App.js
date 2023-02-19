import './App.css'
import React, { useEffect, useState, useMemo } from 'react';
import { getOwnerContract, getWeb3, getErrorMessage } from './ethereum/utils';
import { Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { Button, Message } from 'semantic-ui-react'
import NotFound from './components/NotFound'

import { Admin, CustomRoutes } from 'react-admin';

import IlanBilgileri from './components/user/IlanBilgileri'
import UserEkle from './components/admin/UserEkle';
import UserHisseList from './components/user/UserHisseList';
import RealEstateHissedarEkle from './components/admin/RealEstateHissedarEkle';
import RealEstateEkle from './components/admin/RealEstateEkle';
import Advertisements from './components/user/Advertisements';
import OnayPage from './components/admin/OnayPage';
import TransactionInfo from './components/TransactionInfo';
import RealEstateTable from './components/admin/RealEstateTable';
import { NotaryMenu } from './NotaryMenu';

export const UserContext = React.createContext(null);

function App() {
  const web3 = useMemo(() => getWeb3(), [])
  const [currentAccount, setCurrentAccount] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [adminFlag, setAdminFlag] = useState(null);
  const [txReceipt, setTxReceipt] = useState(null);

  const ownerContract = getOwnerContract(web3);

  useEffect(() => {
    if (!currentAccount) {
      return;
    }
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

  const connectWalletComp = () => {
    return <Container>
      <Message info>
        <Message.Header>Website is not connected to Ethereum</Message.Header>
        <p>You need to connect your wallet first</p>
      </Message>
      <Button primary onClick={() => connectWallet()}>Connect Wallet</Button>
    </Container>
  }

  return (
    <UserContext.Provider value={{ web3, currentAccount, isAdmin: adminFlag, txReceipt, setTxReceipt }}>
      <TransactionInfo txReceipt={txReceipt} setTxReceipt={setTxReceipt} />
      {!currentAccount ? connectWalletComp() :
        <Admin menu={NotaryMenu} >
          <CustomRoutes>
            <Route path='/' element={<UserHisseList />} />
            <Route path='/notary/user-ekle' element={<UserEkle />} />
            <Route path='/notary/real-estate-table' element={<RealEstateTable />} />
            <Route path='/notary/hissedar-ekle' element={<RealEstateHissedarEkle />} />
            <Route path='/notary/real-estate-ekle' element={<RealEstateEkle />} />
            <Route path='/notary/para-transferi-onayla' element={<OnayPage />} />
            <Route path='/notary/varliklarim' element={<UserHisseList />} />
            <Route path='/notary/user-ilan/:ilanId' element={<IlanBilgileri />} />
            <Route path='/notary/ilanlar' element={<Advertisements />} />
            <Route
              path='*'
              element={<NotFound />}
            />
          </CustomRoutes>
        </Admin>
      }
    </UserContext.Provider>
  )
}

export default App
