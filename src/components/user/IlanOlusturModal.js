import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Button, Input, Modal, Form } from 'semantic-ui-react'
import { isValidNumber } from '../../ethereum/utils';

function IlanOlusturModal(props) {
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('');

    async function ilanOlustur() {
        await props.ilanOlustur(props.hisse, amount);
        setOpen(false);
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary>İlan Oluştur</Button>}
        >
            <Modal.Header>İlan Oluştur</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>İlan fiyat</label>
                            <Input
                                focus
                                error={amount !== '' && !isValidNumber(amount)}
                                placeholder='Fiyat'
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>Vazgeç</Button>
                <Button color='blue' onClick={() => ilanOlustur()}>İlan Ver</Button>
            </Modal.Actions>
        </Modal>
    )
}

IlanOlusturModal.propTypes = {
    hisse: PropTypes.any,
    ilanOlustur: PropTypes.func,
}

export default IlanOlusturModal
