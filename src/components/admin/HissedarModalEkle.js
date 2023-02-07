import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form } from 'semantic-ui-react'

function HissedarModalEkle(props) {
    const [open, setOpen] = useState(false);
    const [realEstateHissedarInfo, setRealEstateHissedarInfo] = useState({ ownAdd: '', realEstateId: '', hisse: '' });

    useEffect(() => {
        realEstateHissedarInfo['realEstateId'] = props.realEstateId;
        setRealEstateHissedarInfo({ ...realEstateHissedarInfo });
    }, [props.realEstateId]);


    const setFormInfoToState = ({ name, value }) => {
        realEstateHissedarInfo[name] = value;
        setRealEstateHissedarInfo({ ...realEstateHissedarInfo });
    }

    const addHissedar = () => {
        props.addHissedarRealEstate(realEstateHissedarInfo);
        setOpen(false);
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button disabled={props.disable} primary>Hissedar Ekle</Button>}
        >
            <Modal.Header>Hissedar Ekle</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Gayrimenkul Numarası</label>
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
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={() => setOpen(false)}>Vazgeç</Button>
                <Button color='blue' onClick={() => addHissedar()}>Hissedar Ekle</Button>
            </Modal.Actions>
        </Modal>
    )
}

HissedarModalEkle.propTypes = {
    addHissedarRealEstate: PropTypes.func,
    realEstateId: PropTypes.any,
    disable: PropTypes.bool,
}

export default HissedarModalEkle;
