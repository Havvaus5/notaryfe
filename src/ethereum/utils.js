import Web3 from 'web3'
import crowdfundingAbi from './crowdfundingAbi'
import realEstateAbi from './realEstateAbi'
import realEstateOwnerRelationAbi from './realEstateOwnerRelationAbi'
//import { readFileSync } from 'fs';
//import { resolve } from 'path'
var data = require('../../../truffle-project/build/contracts/RealEstateSaleAd.json'); 

export function getWeb3() {
  return new Web3(window.ethereum)
}

export function getContract(web3, contractAddress) {
  return new web3.eth.Contract(crowdfundingAbi, contractAddress)
}

export function getRealEstateContract(web3, contractAddress) {
  return new web3.eth.Contract(realEstateAbi, contractAddress, { gas: 3000000 });
}

export function getRealEstateOwnerRelationContract(web3, contractAddress) {
  return new web3.eth.Contract(realEstateOwnerRelationAbi, contractAddress, { gas: 3000000 });
}

export function getRealEstateSaleAd(web3) {
  //const contractPath2 = resolve(__dirname, '../../../truffle-project/build/contracts', 'RealEstateSaleAd.json');    
  //var contractSource2 = readFileSync(contractPath2).toString('utf-8');
  //var parsedObject = JSON.parse(contractSource2);
  var abi =data.abi;
  var contractAddress = data.networks[5777].address;


}

export function getErrorMessage(err) {
  var errorMessageInJson = JSON.parse(
    err.message.slice(58, err.message.length - 2)
  );

  var errorMessageToShow = errorMessageInJson.data.data[Object.keys(errorMessageInJson.data.data)[0]].reason;
  return errorMessageToShow;  
}

