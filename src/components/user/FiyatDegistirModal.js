import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Modal, Form } from 'semantic-ui-react';
import { isValidNumber } from '../../ethereum/utils';

function FiyatDegistirModal(props) {
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('');

    async function changeSatisFiyat() {
        await props.changeSatisFiyat(amount);
        setOpen(false);
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary>Satış Fiyatı Değiştir</Button>}
        >
            <Modal.Header>Satış Fiyatı Değiştir</Modal.Header>
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
                <Button color='blue' onClick={() => changeSatisFiyat()}>Satış fiyat değiştir</Button>
            </Modal.Actions>
        </Modal>
    )
}

FiyatDegistirModal.propTypes = {
    changeSatisFiyat: PropTypes.func,
}

export default FiyatDegistirModal
