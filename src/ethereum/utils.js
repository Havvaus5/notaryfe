import Web3 from 'web3'
import crowdfundingAbi from './crowdfundingAbi'
import realEstateAbi from './realEstateAbi'
import realEstateOwnerRelationAbi from './realEstateOwnerRelationAbi'

export function getWeb3() {
  return new Web3(window.ethereum)
}

export function getContract(web3, contractAddress) {
  return new web3.eth.Contract(crowdfundingAbi, contractAddress)
}

export function getRealEstateContract(web3, contractAddress){
  return new web3.eth.Contract(realEstateAbi, contractAddress)
}

export function getRealEstateOwnerRelationContract(web3, contractAddress){
    return new web3.eth.Contract(realEstateOwnerRelationAbi, contractAddress);
}