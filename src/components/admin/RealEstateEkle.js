import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getWeb3, getRealEstateContract } from '../../ethereum/utils';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'


function RealEstateEkle(props) {
    const [realEstateInfo, setRealEstateInfo] = useState({mahalle: '', payda: ''});
    const [contractAddress, setContractAddress] = useState('0xdB07115645B84a19075De3448fDB219ef01f6c1A');
    const [currentAccount, setCurrentAccount] = useState(null);
    const [networkId, setNetworkId] = useState(null);
    const web3 = getWeb3();

    useEffect(() => {
      if (!currentAccount) return;

    }, [web3, currentAccount, networkId]);

    async function addRealEstate(event) {
        const contract = getRealEstateContract(web3, contractAddress);
        await contract.methods.addRealEstate(realEstateInfo.mahalle, realEstateInfo.payda).send({from: currentAccount});
     }

     async function connectWallet(){
        const accounts = await web3.eth.requestAccounts();
        setCurrentAccount(accounts[0]);
      }
    
      async function getCurrentConnectedAccount(){
        const accounts = await web3.eth.getAccounts();
        setCurrentAccount(accounts[0]);
      }
      
      window.ethereum.on('accountsChanged', function(accounts){
        if(accounts){
          setCurrentAccount(accounts[0]);
        }
      })

      window.ethereum.on('networkChanged', function(networkId){
        console.log("New network ID: ", networkId)
        setNetworkId(networkId)
      })
    
     const setFormInfoToState = ({name, value }) =>{
        realEstateInfo[name] = value;
        setRealEstateInfo({...realEstateInfo});
     }
    
     const getForm = () => {
      return  <Form>
      <Form.Field>
        <label>Mahalle</label>
        <input placeholder='Mahalle' name='mahalle' onChange={(e) => setFormInfoToState(e.target)}/>
      </Form.Field>
      <Form.Field>
        <label>Hissedar Sayısı</label>
        <input placeholder='Hissedar sayısı' name="payda" onChange={(e) => setFormInfoToState(e.target)}/>
      </Form.Field>
      <Button type='submit' onClick={addRealEstate}>Submit</Button>
    </Form>;
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

    return 
        {currentAccount ? getForm() : getConnectWallet()}
    ;
}

export default RealEstateEkle;

RealEstateEkle.propTypes = {
    
};