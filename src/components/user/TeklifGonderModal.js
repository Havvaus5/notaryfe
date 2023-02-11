import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types'
import { Button, Input, Modal, Form } from 'semantic-ui-react'
import { isValidNumber } from '../../ethereum/utils';
import { getErrorMessage, getPropositionContract } from '../../ethereum/utils';
import { UserContext } from '../../App';

function TeklifGonderModal(props) {
    const { web3, currentAccount, setTxReceipt } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('');
    
    const contract = getPropositionContract(web3);

    async function teklifGonder() {
        try {
            await contract.methods.teklifGonder(props.ilanId, amount).send({ from: currentAccount })
                .once('receipt', function (receipt) {
                    setTxReceipt(receipt);
                });
        } catch (err) {
            console.log(err);
            alert(getErrorMessage(err));
        }
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button primary floated='right'>Teklif Gönder</Button>}
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

        </React.Fragment>
    )
}

TeklifGonderModal.propTypes = {
    ilanId: PropTypes.any,
}

export default TeklifGonderModal
