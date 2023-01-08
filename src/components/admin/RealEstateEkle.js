import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react'

function RealEstateEkle(props) {
  const [realEstateInfo, setRealEstateInfo] = useState({ mahalle: '', payda: '' });

  const setFormInfoToState = ({ name, value }) => {
    realEstateInfo[name] = value;
    setRealEstateInfo({ ...realEstateInfo });
  }

  return (
    <Form>
      <Form.Field>
        <label>Mahalle</label>
        <input placeholder='Mahalle' name='mahalle' onChange={(e) => setFormInfoToState(e.target)} />
      </Form.Field>
      <Form.Field>
        <label>Hissedar Sayısı</label>
        <input placeholder='Hissedar sayısı' name="payda" onChange={(e) => setFormInfoToState(e.target)} />
      </Form.Field>
      <Button type='submit' onClick={() => props.addRealEstate(realEstateInfo)}>Submit</Button>
    </Form>
  );

}

export default RealEstateEkle;

RealEstateEkle.propTypes = {
  addRealEstate: PropTypes.func,
};