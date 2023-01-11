import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import { getRealEstateOwnerRelationContract, getErrorMessage } from '../../ethereum/utils';

function RealEstateHissedarEkle(props) {
  const { web3, currentAccount } = props;
  const [realEstateHissedarInfo, setRealEstateHissedarInfo] = useState({ ownAdd: '', realEstateId: '', hisse: '' });
  const contract = getRealEstateOwnerRelationContract(web3);

  const setFormInfoToState = ({ name, value }) => {
    realEstateHissedarInfo[name] = value;
    setRealEstateHissedarInfo({ ...realEstateHissedarInfo });
  }

  async function addHissedarRealEstate() {
    try {
      await contract.methods.addOwnerShip(realEstateHissedarInfo.ownAdd, realEstateHissedarInfo.realEstateId, realEstateHissedarInfo.hisse).send({ from: currentAccount })
        .once('receipt', function (receipt) {
          console.log('Transaction receipt received', receipt)
        });
    } catch (err) {
      alert(getErrorMessage(err));
    }
  }

  return (
    <React.Fragment>
      {props.isAdmin ? <Form>
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
        <Button type='submit' onClick={() => addHissedarRealEstate()}>Submit</Button>
      </Form> : ''}
    </React.Fragment>
  );
}

RealEstateHissedarEkle.propTypes = {
  currentAccount: PropTypes.any,
  web3: PropTypes.any,
  isAdmin: PropTypes.bool,
}

export default RealEstateHissedarEkle
