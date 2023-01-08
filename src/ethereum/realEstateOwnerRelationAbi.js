const realEstateOwnerRelationAbi =  [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "realEstateContractAdd",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "ownerContractAdd",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "realEstateId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "hisseId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "NewHisseAddedToRealEstate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "realEstateId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "hisseId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "NewHisseAndRealEstateAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "realEstateId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "hisseId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnerHissePayAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "hiseId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "oldOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnerShipChanged",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "hisseIdHisseMap",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "pay",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "realEstateId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "ownerAdd",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "registered",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "ownerHisseIdMap",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "realEstateIdHisseMap",
    "outputs": [
      {
        "internalType": "bool",
        "name": "registered",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "payda",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "toplamHisseMiktar",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "realEstateId",
        "type": "uint256"
      }
    ],
    "name": "testOwnerShip",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ownAdd",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "realEstateId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_hisse",
        "type": "uint256"
      }
    ],
    "name": "addOwnerShip",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ownAdd",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "hisseIdList",
        "type": "uint256[]"
      }
    ],
    "name": "getOwnerHisseId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "hisseId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "changeOwnerShip",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "hisseId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "ownAdd",
        "type": "address"
      }
    ],
    "name": "hisseSatisaCikabilirMi",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ownAdd",
        "type": "address"
      }
    ],
    "name": "getOwnerHisseIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ownAdd",
        "type": "address"
      }
    ],
    "name": "getHisseInfos",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "pay",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "realEstateId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "ownerAdd",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "registered",
            "type": "bool"
          }
        ],
        "internalType": "struct RealEstateOwnerRelation.Hisse[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]
export default realEstateOwnerRelationAbi; 