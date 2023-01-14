import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RealEstate from './RealEstate';
import { REAL_ESTATE_SORGULA } from '../util';
import { Button, Modal } from 'semantic-ui-react'

function RealEstateSorgula(props) {
    const [open, setOpen] = useState(false);
    const [sorgula, setSorgula] = useState(false);

    const sorgulaYap = () => {
        setSorgula(true);
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary>Gayrimenkul Sorgula</Button>}
        >
            <Modal.Header>Gayrimenkul Sorgula</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <RealEstate submitType={REAL_ESTATE_SORGULA} sorgula= {sorgula} setSorgula={setSorgula} setSorgulamaModal={setOpen} {...props} />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={() => setOpen(false)}>Vazgeç</Button>
                <Button color='blue' onClick={() => sorgulaYap()}>Sorgula</Button>                
            </Modal.Actions>
        </Modal>
    )
}

RealEstateSorgula.propTypes = {
    setRealEstateId: PropTypes.func,
}

export default RealEstateSorgula
