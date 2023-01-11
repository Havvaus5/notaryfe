import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Button, Input, Modal, Form } from 'semantic-ui-react'
import { isValidNumber } from '../../ethereum/utils';
import { getErrorMessage, getPropositionContract } from '../../ethereum/utils';

function TeklifGonderModal(props) {
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('');

    const contract = getPropositionContract(props.web3);
    
    async function teklifGonder() {
        try {
            await contract.methods.teklifGonder(props.ilanId, amount).send({ from: props.userAccount })
                .once('receipt', function (receipt) {
                    console.log('Transaction receipt received', receipt)
                });            
        } catch (err) {
            alert(getErrorMessage(err));
        }
        setOpen(false);
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary>Teklif Gönder</Button>}
        >
            <Modal.Header>Teklif Gönder</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Teklif Gönder</label>
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
                <Button color='blue' onClick={() => teklifGonder()}>Teklif Gönder</Button>
            </Modal.Actions>
        </Modal>
    )
}

TeklifGonderModal.propTypes = {
    ilanId: PropTypes.any,
    web3: PropTypes.any,
    userAccount: PropTypes.any,
}

export default TeklifGonderModal
