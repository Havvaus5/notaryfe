import Web3 from 'web3'
import crowdfundingAbi from './crowdfundingAbi'

var owner = require('./contracts/Owner.json'); 
var realEstate = require('./contracts/RealEstate.json'); 
var realEstateOwnerRelation = require('./contracts/RealEstateOwnerRelation.json'); 
var realEstateSaleAd = require('./contracts/RealEstateSaleAd.json'); 
var propositionContract = require('./contracts/Proposition.json'); 

export function getWeb3() {
  return new Web3(window.ethereum)
}

export function getContract(web3, contractAddress) {
  return new web3.eth.Contract(crowdfundingAbi, contractAddress)
}

export function getOwnerContract(web3) {
  var abi = owner.abi;
  var contractAddress = getContractAddress(owner);
  return new web3.eth.Contract(abi, contractAddress, { gas: 3000000 });
}

export function getRealEstateContract(web3) {
  var abi = realEstate.abi;
  var contractAddress = getContractAddress(realEstate);
  return new web3.eth.Contract(abi, contractAddress, { gas: 3000000 });
}

export function getRealEstateOwnerRelationContract(web3) {
  var abi = realEstateOwnerRelation.abi;
  var contractAddress = getContractAddress(realEstateOwnerRelation);
  return new web3.eth.Contract(abi, contractAddress, { gas: 3000000 });
}

export function getRealEstateSaleAd(web3) {
  var abi =realEstateSaleAd.abi;
  var contractAddress = getContractAddress(realEstateSaleAd);
  return new web3.eth.Contract(abi, contractAddress, { gas: 3000000 });
}

export function getPropositionContract(web3) {
  var abi =propositionContract.abi;
  var contractAddress = getContractAddress(propositionContract);
  return new web3.eth.Contract(abi, contractAddress, { gas: 3000000 });
}

function getContractAddress(data){
  return data.networks[5777].address;
}

export function getErrorMessage(err) {
  console.log(err);
  var errorMessageInJson = JSON.parse(
    err.message.slice(58, err.message.length - 2)
  );

  var errorMessageToShow = errorMessageInJson.data.data[Object.keys(errorMessageInJson.data.data)[0]].reason;
  return errorMessageToShow;  
}

export function isValidNumber(amount) {
  return !isNaN(parseFloat(amount))
}

export function blockTimeStampToDate(timeStamp){
  var date =new Date(timeStamp*1000);
  return date.toUTCString();
}
