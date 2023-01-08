const realEstateAbi =  [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "mahalle",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "payda",
          "type": "uint256"
        }
      ],
      "name": "addRealEstate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "realEstateId",
          "type": "uint256"
        }
      ],
      "name": "isRealEstateRegisted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "realEstateId",
          "type": "uint256"
        }
      ],
      "name": "getRealEstatePayda",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "realEstateId",
          "type": "uint256"
        }
      ],
      "name": "getRealEstateInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

export default realEstateAbi;