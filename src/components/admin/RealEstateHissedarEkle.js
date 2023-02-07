import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Grid } from 'semantic-ui-react';
import { getRealEstateOwnerRelationContract, getErrorMessage } from '../../ethereum/utils';
import RealEstateSorgula from './RealEstateSorgula';
import NotAdminPage from '../NotAdminPage';

function RealEstateHissedarEkle(props) {
  const { web3, currentAccount, setTxReceipt } = props;
  const contract = getRealEstateOwnerRelationContract(web3);

  const [realEstateHissedarInfo, setRealEstateHissedarInfo] = useState({ ownAdd: '', realEstateId: '', hisse: '' });
  
  const setFormInfoToState = ({ name, value }) => {
    realEstateHissedarInfo[name] = value;
    setRealEstateHissedarInfo({ ...realEstateHissedarInfo });
  }

  const setRealEstateId = (value) => {
    realEstateHissedarInfo['realEstateId'] = value;
    setRealEstateHissedarInfo({ ...realEstateHissedarInfo });
  }

  async function addHissedarRealEstate() {
    try {
      await contract.methods.addOwnerShip(realEstateHissedarInfo.ownAdd, realEstateHissedarInfo.realEstateId, realEstateHissedarInfo.hisse).send({ from: currentAccount })
        .once('receipt', function (receipt) {
          setTxReceipt(receipt);
        });
    } catch (err) {
      alert(getErrorMessage(err));
    }
  }

  return (
    <React.Fragment>
      {props.isAdmin ? <Grid>
        <Grid.Row>
          <Grid.Column>
            <RealEstateSorgula setRealEstateId={setRealEstateId} {...props} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form>
              <Form.Field>
                <label>Sorgulanan Gayrimenkul Numarası</label>
                <input name='realEstateId' value={realEstateHissedarInfo.realEstateId} disabled="true" />
              </Form.Field>
              <Form.Field>
                <label>Hissedar Adress</label>
                <input name='ownAdd' onChange={(e) => setFormInfoToState(e.target)} />
              </Form.Field>
              <Form.Field>
                <label>Hisse Miktar</label>
                <input name="hisse" onChange={(e) => setFormInfoToState(e.target)} />
              </Form.Field>
              <Button color='blue' onClick={() => addHissedarRealEstate()}>Hissedar Ekle</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
        : <NotAdminPage />}
    </React.Fragment>
  );
}

RealEstateHissedarEkle.propTypes = {
  currentAccount: PropTypes.any,
  web3: PropTypes.any,
  isAdmin: PropTypes.bool,
}

export default RealEstateHissedarEkle
