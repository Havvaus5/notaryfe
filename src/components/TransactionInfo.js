import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Table } from 'semantic-ui-react'

function TransactionInfo(props) {
    const [ open, setOpen ] = useState(false);
    const { txReceipt } = props;

    useEffect(() => {
        setOpen(txReceipt != null);
        console.log('Transaction receipt received', txReceipt);
    }, [txReceipt]);

    const closeModal = () => {
        setOpen(false);
        props.setTxReceipt(null);
    }

    return (
        <React.Fragment>
            {txReceipt != null? <Modal
                centered={false}
                open={open}
                onClose={() => setOpen(false)}>
                <Modal.Header>İşlem Bilgisi</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Table basic='very' celled collapsing>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell width={2}>Transaction Hash </Table.Cell>
                                    <Table.Cell>{txReceipt.transactionHash}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Block Hash</Table.Cell>
                                    <Table.Cell>{txReceipt.blockHash}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Block Number</Table.Cell>
                                    <Table.Cell>{txReceipt.blockNumber}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => closeModal()}>Kapat</Button>
                </Modal.Actions>
            </Modal>
                : ' '}
        </React.Fragment>
    )
}

TransactionInfo.propTypes = {
    txReceipt: PropTypes.any,
    setTxReceipt: PropTypes.func,
}

export default TransactionInfo
