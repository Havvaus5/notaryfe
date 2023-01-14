import './App.css'
import React, { useEffect, useState, useMemo } from 'react';
import { getOwnerContract, getWeb3, getErrorMessage } from './ethereum/utils';
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Advertisement, Container, Menu } from 'semantic-ui-react'
import { Button, Message } from 'semantic-ui-react'
import NotFound from './components/NotFound'

import IlanBilgileri from './components/user/IlanBilgileri'
import UserEkle from './components/admin/UserEkle';
import UserHisseList from './components/user/UserHisseList';
import RealEstateHissedarEkle from './components/admin/RealEstateHissedarEkle';
import RealEstateEkle from './components/admin/RealEstateEkle';
import Advertisements from './components/user/Advertisements';
import OnayPage from './components/admin/OnayPage';

function App() {
  let navigate = useNavigate()
  const web3 = useMemo(() => getWeb3(), [])
  const [currentAccount, setCurrentAccount] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [adminFlag, setAdminFlag] = useState(null);
  
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

  const connectWalletComp =() =>{
    return <>
    <Message info>
        <Message.Header>Website is not connected to Ethereum</Message.Header>
        <p>You need to connect your wallet first</p>
    </Message>
    <Button primary onClick={() => connectWallet()}>Connect Wallet</Button>
</>
  }

  return (
    
    <Container>
      <Menu secondary>
        <Menu.Item
          name='home'
          onClick={() => navigate('/')}
        />
      </Menu>
      {!currentAccount ? connectWalletComp() :
      <Routes>
        <Route path='/' element={<UserHisseList currentAccount={currentAccount} web3={web3} />} />
        <Route path='/notary/user-ekle' element={<UserEkle web3={web3} currentAccount={currentAccount} isAdmin={adminFlag}/>} />
        <Route path='/notary/hissedar-ekle' element={<RealEstateHissedarEkle web3={web3} currentAccount={currentAccount} isAdmin={adminFlag}/>} />
        <Route path='/notary/real-estate-ekle' element={<RealEstateEkle web3={web3} currentAccount={currentAccount} isAdmin={adminFlag}/>} />
        <Route path='/notary/para-transferi-onayla' element={<OnayPage web3={web3} currentAccount={currentAccount} isAdmin={adminFlag}/>} />
        <Route path='/notary/varliklarim' element={<UserHisseList currentAccount={currentAccount} web3={web3} />} />
        <Route path='/notary/user-ilan/:ilanId' element={<IlanBilgileri web3={web3} currentAccount={currentAccount} adminFlag={adminFlag} />} />
        <Route path='/notary/ilanlar' element={<Advertisements web3={web3} currentAccount={currentAccount}/>} />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
}
    </Container>
  )
}

export default App
