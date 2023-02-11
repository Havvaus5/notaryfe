import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react'
import { getRealEstateContract, getErrorMessage } from '../../ethereum/utils';
import { REAL_ESTATE_EKLE } from '../util';
import NotAdminPage from '../NotAdminPage';
import { UserContext } from '../../App';

function RealEstate(props) {
  const {web3, currentAccount, setTxReceipt, isAdmin} = useContext(UserContext);
  const contract = getRealEstateContract(web3);
  const initRealEstateInfo = {
    il: '',
    ilce: '',
    mahalle: '',
    cadde: '',
    sokak: '',
    kat: '',
    daireNo: '',
    tasinmazTip: '',
    nitelik: '',
    ada: '',
    parsel: '',
    payda: '',
    realEstateId: 0,
    registered: false,
  };
  const [realEstateInfo, setRealEstateInfo] = useState(initRealEstateInfo);

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
      const realEstateTuple = [realEstateInfo.realEstateId, realEstateInfo.il, realEstateInfo.ilce, realEstateInfo.mahalle,
        realEstateInfo.cadde, realEstateInfo.sokak, Number(realEstateInfo.kat), realEstateInfo.daireNo, realEstateInfo.tasinmazTip, realEstateInfo.nitelik,
        realEstateInfo.ada, realEstateInfo.parsel, Number(realEstateInfo.payda), realEstateInfo.registered];
      await contract.methods.addRealEstate(realEstateTuple).send({ from: currentAccount })
        .once('receipt', function (receipt) {
          setTxReceipt(receipt);
          setRealEstateInfo({...initRealEstateInfo});
        });
    } catch (err) {
      alert(getErrorMessage(err));
    }
  }

  async function realEstateSorgula() {
    try {
      const realEstateTuple = getRealEstateTuple();
      const res = await contract.methods.getId(realEstateTuple).call();
      props.setRealEstateId(res);
      props.setSorgulamaModal(false);
      props.setSorgula(false);
    } catch (err) {
      alert(getErrorMessage(err));
    }
  }

  const getRealEstateTuple = () => {
    return [realEstateInfo.realEstateId, realEstateInfo.il, realEstateInfo.ilce, realEstateInfo.mahalle,
      realEstateInfo.cadde, realEstateInfo.sokak, Number(realEstateInfo.kat), realEstateInfo.daireNo, realEstateInfo.tasinmazTip, realEstateInfo.nitelik,
      realEstateInfo.ada, realEstateInfo.parsel, Number(realEstateInfo.payda), realEstateInfo.registered];
  }

  return (
    <React.Fragment>
      {isAdmin ? <Form>
        <Form.Field>
          <label>İl</label>
          <input placeholder='İl' name='il' value={realEstateInfo.il} onChange={(e) => setFormInfoToState(e.target)} />
        </Form.Field>
        <Form.Field>
          <label>İlçe</label>
          <input placeholder='İlçe' name='ilce'value={realEstateInfo.ilce} onChange={(e) => setFormInfoToState(e.target)} />
        </Form.Field>
        <Form.Field>
          <label>Mahalle</label>
          <input placeholder='Mahalle' name='mahalle' value={realEstateInfo.mahalle} onChange={(e) => setFormInfoToState(e.target)} />
        </Form.Field>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Cadde' placeholder='Cadde' name='cadde' value={realEstateInfo.cadde} onChange={(e) => setFormInfoToState(e.target)} />
          <Form.Input fluid label='Sokak' placeholder='Sokak' name='sokak' value={realEstateInfo.sokak} onChange={(e) => setFormInfoToState(e.target)} />
          <Form.Input fluid label='Kat' placeholder='Kat' name='kat' value={realEstateInfo.kat} onChange={(e) => setFormInfoToState(e.target)} />
          <Form.Input fluid label='Bina/Daire No' placeholder='Bina/Daire No' name='daireNo' value={realEstateInfo.daireNo} onChange={(e) => setFormInfoToState(e.target)} />
        </Form.Group>
        <Form.Field>
          <label>Taşınmaz Tip</label>
          <input placeholder='Taşınmaz Tip' name='tasinmazTip' value={realEstateInfo.tasinmazTip} onChange={(e) => setFormInfoToState(e.target)} />
        </Form.Field>
        <Form.Field>
          <label>Nitelik</label>
          <input placeholder='Nitelik' name='nitelik' value={realEstateInfo.nitelik} onChange={(e) => setFormInfoToState(e.target)} />
        </Form.Field>
        <Form.Field>
          <label>Ada</label>
          <input placeholder='Ada' name='ada' value={realEstateInfo.ada} onChange={(e) => setFormInfoToState(e.target)} />
        </Form.Field>
        <Form.Field>
          <label>Parsel</label>
          <input placeholder='Parsel' name='parsel' value={realEstateInfo.parsel} onChange={(e) => setFormInfoToState(e.target)} />
        </Form.Field>
        <Form.Field>
          <label>Hissedar Sayısı</label>
          <input placeholder='Hissedar sayısı' name="payda" value={realEstateInfo.payda} onChange={(e) => setFormInfoToState(e.target)} />
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