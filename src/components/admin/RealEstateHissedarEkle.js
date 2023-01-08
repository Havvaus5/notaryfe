import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getRealEstateOwnerRelationContract, getWeb3 } from '../../ethereum/utils';
import { Button, Checkbox, Form } from 'semantic-ui-react';

function RealEstateHissedarEkle(props) {
  const [realEstateHissedarInfo, setRealEstateHissedarInfo] = useState({ ownAdd: '', realEstateId: '', hisse: 0});
  const [contractAddress, setContractAddress] = useState('0x111DeFb21248646a57A679dc1876530C433Fb546');
  const [currentAccount, setCurrentAccount] = useState(null);
  const web3 = getWeb3();

  const setFormInfoToState = ({ name, value }) => {
    realEstateHissedarInfo[name] = value;
    setRealEstateHissedarInfo({ ...realEstateHissedarInfo });
  }

  async function addHissedarRealEstate(event) {
    const contract = getRealEstateOwnerRelationContract(web3, contractAddress);
    await contract.methods.addOwnerShip(realEstateHissedarInfo.ownAdd, realEstateHissedarInfo.realEstateId, realEstateHissedarInfo.hisse).send({ from: currentAccount, gas: 3000000 });
  }

  return (
    <Form>
      <Form.Field>
        <label>Hissedar Adress</label>
        <input name='ownAdd' onChange={(e) => setFormInfoToState(e.target)} />
      </Form.Field>
      <Form.Field>
        <label>Real Estate Id</label>
        <input name="realEstateId" onChange={(e) => setFormInfoToState(e.target)} />
      </Form.Field>
      <Form.Field>
        <label>Hisse</label>
        <input name="hisse" onChange={(e) => setFormInfoToState(e.target)} />
      </Form.Field>
      <Button type='submit' onClick={addHissedarRealEstate}>Submit</Button>
    </Form>
  );
}

RealEstateHissedarEkle.propTypes = {}

export default RealEstateHissedarEkle
