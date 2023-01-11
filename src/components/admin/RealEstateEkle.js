import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react'
import { getRealEstateContract, getErrorMessage } from '../../ethereum/utils';

function RealEstateEkle(props) {
  const { web3, currentAccount } = props;
  const [realEstateInfo, setRealEstateInfo] = useState({ mahalle: '', payda: '' });
  const contract = getRealEstateContract(web3);

  const setFormInfoToState = ({ name, value }) => {
    realEstateInfo[name] = value;
    setRealEstateInfo({ ...realEstateInfo });
  }

  async function addRealEstate() {
    try {
      await contract.methods.addRealEstate(realEstateInfo.mahalle, realEstateInfo.payda).send({ from: currentAccount })
        .once('receipt', function (receipt) {
          console.log('Transaction receipt received', receipt)
        });
    } catch (err) {
      alert(getErrorMessage(err));
    }
  }

  return (
    <React.Fragment>{props.isAdmin ? <Form>
      <Form.Field>
        <label>Mahalle</label>
        <input placeholder='Mahalle' name='mahalle' onChange={(e) => setFormInfoToState(e.target)} />
      </Form.Field>
      <Form.Field>
        <label>Hissedar Sayısı</label>
        <input placeholder='Hissedar sayısı' name="payda" onChange={(e) => setFormInfoToState(e.target)} />
      </Form.Field>
      <Button type='submit' onClick={() => addRealEstate()}>Submit</Button>
    </Form> : ' '}
    </React.Fragment>
  );

}

export default RealEstateEkle;

RealEstateEkle.propTypes = {
  currentAccount: PropTypes.any,
  web3: PropTypes.any,
  isAdmin: PropTypes.bool,
};