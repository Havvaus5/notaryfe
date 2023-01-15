import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react'
import { getRealEstateContract, getErrorMessage } from '../../ethereum/utils';
import { REAL_ESTATE_EKLE } from '../util';
import NotAdminPage from '../NotAdminPage';

function RealEstate(props) {
  const { web3, currentAccount, setTxReceipt } = props;
  const contract = getRealEstateContract(web3);
  const [realEstateInfo, setRealEstateInfo] = useState({
    il: '',
    ilce: '',
    mahalle: '',
    tasinmazTip: '',
    nitelik: '',
    kat: '',
    daireNo: '',
    ada: '',
    parsel: '',
    ciltNo: '',
    sayfaNo: '',
    payda: ''
  });

  useEffect(() => {
    if (props.sorgula) {
      realEstateSorgula()
    }
  }, [props.sorgula]);


  const setFormInfoToState = ({ name, value }) => {
    realEstateInfo[name] = value;
    setRealEstateInfo({ ...realEstateInfo });
  }

  async function addRealEstate() {
    try {
      await contract.methods.addRealEstate(realEstateInfo.mahalle, realEstateInfo.payda).send({ from: currentAccount })
        .once('receipt', function (receipt) {
          setTxReceipt(receipt);          
        });
    } catch (err) {
      alert(getErrorMessage(err));
    }
  }

  async function realEstateSorgula() {
    try {
      const res = await contract.methods.getId(realEstateInfo.mahalle).call();
      props.setRealEstateId(res);
      props.setSorgulamaModal(false);
      props.setSorgula(false);
    } catch (err) {
      alert(getErrorMessage(err));
    }
  }

  return (
    <React.Fragment>
      {props.isAdmin ? <Form>
        <Form.Field>
          <label>İl</label>
          <input placeholder='İl' name='il' onChange={(e) => setFormInfoToState(e.target)} />
        </Form.Field>
        <Form.Field>
          <label>İlçe</label>
          <input placeholder='İlçe' name='ilce' onChange={(e) => setFormInfoToState(e.target)} />
        </Form.Field>
        <Form.Field>
          <label>Mahalle</label>
          <input placeholder='Mahalle' name='mahalle' onChange={(e) => setFormInfoToState(e.target)} />
        </Form.Field>
        <Form.Field>
          <label>Taşınmaz Tip</label>
          <input placeholder='Taşınmaz Tip' name='tasinmazTip' onChange={(e) => setFormInfoToState(e.target)} />
        </Form.Field>
        <Form.Field>
          <label>Nitelik</label>
          <input placeholder='Nitelik' name='nitelik' onChange={(e) => setFormInfoToState(e.target)} />
        </Form.Field>
        <Form.Field>
          <label>Ada</label>
          <input placeholder='Ada' name='ada' onChange={(e) => setFormInfoToState(e.target)} />
        </Form.Field>
        <Form.Field>
          <label>Parsel</label>
          <input placeholder='Parsel' name='parsel' onChange={(e) => setFormInfoToState(e.target)} />
        </Form.Field>
        <Form.Field>
          <label>Hissedar Sayısı</label>
          <input placeholder='Hissedar sayısı' name="payda" onChange={(e) => setFormInfoToState(e.target)} />
        </Form.Field>
        {
          props.submitType === REAL_ESTATE_EKLE ? <Button color='blue' onClick={() => addRealEstate()} >Gayrimenkul Ekle</Button> : ''
        }

      </Form> : <NotAdminPage />}
    </React.Fragment>
  );

}

export default RealEstate;

RealEstate.propTypes = {
  currentAccount: PropTypes.any,
  web3: PropTypes.any,
  isAdmin: PropTypes.bool,
  submitType: PropTypes.any,
  setRealEstateId: PropTypes.func,
  sorgula: PropTypes.bool,
  setSorgula: PropTypes.func,
  setSorgulamaModal: PropTypes.func,
};