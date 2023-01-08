import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

function RealEstateHissedarEkle(props) {
  const [realEstateHissedarInfo, setRealEstateHissedarInfo] = useState({ ownAdd: '', realEstateId: '', hisse: ''});


  const setFormInfoToState = ({ name, value }) => {
    realEstateHissedarInfo[name] = value;
    setRealEstateHissedarInfo({ ...realEstateHissedarInfo });
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
      <Button type='submit' onClick={()=> props.hissedarEkle(realEstateHissedarInfo)}>Submit</Button>
    </Form>
  );
}

RealEstateHissedarEkle.propTypes = {
  hissedarEkle: PropTypes.func,
}

export default RealEstateHissedarEkle
