import React, { useState, useContext } from 'react'
import { getOwnerContract, getErrorMessage } from '../../ethereum/utils';
import { Button, Form, Checkbox } from 'semantic-ui-react';
import NotAdminPage from '../NotAdminPage';
import { UserContext } from '../../App';

function UserEkle() {
    const {web3, currentAccount, setTxReceipt, isAdmin} = useContext(UserContext);

    const contract = getOwnerContract(web3);

    const [ownerInfo, setOwnerInfo] = useState({ name: '', tcknVkn: '', adminMi: false });
    
    const setFormInfoToState = ({ name, value }) => {
        ownerInfo[name] = value;
        setOwnerInfo({ ...ownerInfo });
    }

    const setAdminMi = (e, { checked }) => {
        ownerInfo['adminMi'] = checked;
        setOwnerInfo({ ...ownerInfo });
    }

    async function userEkle() {
        try {
            if (ownerInfo.adminMi) {
                await contract.methods.addAdmin(ownerInfo.tcknVkn, ownerInfo.name).send({ from: currentAccount })
                    .once('receipt', function (receipt) {
                        setTxReceipt(receipt);
                    });
            } else {
                await contract.methods.addOwner(ownerInfo.tcknVkn, ownerInfo.name).send({ from: currentAccount })
                    .once('receipt', function (receipt) {
                        setTxReceipt(receipt);
                    });
            }
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    return (
        <React.Fragment>
            {isAdmin ? <Form>
                <Form.Field>
                    <label>TCKN/VKN</label>
                    <input name='tcknVkn' onChange={(e) => setFormInfoToState(e.target)} />
                </Form.Field>
                <Form.Field>
                    <label>Unvan/ İsim Soyisim</label>
                    <input name="name" onChange={(e) => setFormInfoToState(e.target)} />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label='Admin Rol'
                        name='adminMi'
                        value='adminMi'
                        checked={ownerInfo.adminMi}
                        onChange={setAdminMi}
                    />
                </Form.Field>
                <Button type='submit' onClick={() => userEkle()}>Submit</Button>
            </Form> : <NotAdminPage />}
        </React.Fragment>
    )
}

export default UserEkle
