import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, Segment, Icon, Header, Button, Modal } from 'semantic-ui-react'
import { blockTimeStampToDate, getRealEstateSaleAd } from '../../ethereum/utils';

function ChainModal(props) {
    const realEstateSaleAdContract = getRealEstateSaleAd(props.web3);

    const [ open, setOpen ] = useState(false);
    const [blockList, setBlockList] = useState(null);

    useEffect(() => {
        getTxes();
    }, [props.currentAccount, props.hisseId]);

    async function getTxes() {
        props.web3.eth.getBlockNumber().then(blockNumber => {
            realEstateSaleAdContract.getPastEvents('changedOwnerShip',
                {
                    fromBlock: 0,
                    toBlock: blockNumber,
                },
                (err, events) => {
                    const filteredEvents = events.filter(filterByHisseId);
                    setBlockList(filteredEvents);
                    console.log(err);
                });
        })

    }

    function filterByHisseId(item){
        return props.hisseId === item.returnValues.hisseId;
    }

    return (
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button primary>Tarihçe</Button>}
    >
        <Modal.Header>Mülk Eski Sahipleri</Modal.Header>
        <Modal.Content>
        {
                blockList != null && blockList.length !== 0 ? <Grid style={{'overflow-x':'auto', 'overflow-y':'clip', 'flex-wrap': 'inherit' }}>
                    {blockList.map(item => {
                        return <Grid.Column key={item.blockNumber} style={{ 'width': 'fit-content' }}>
                            <Segment.Group horizontal style={{ 'border': 'none', 'boxShadow': 'none' }}>
                                <Segment >
                                    <Segment.Group vertical="true" >
                                        <Segment.Group horizontal>
                                            <Segment>
                                                <Header as='h4'>
                                                    <Header.Content>
                                                        Block Number
                                                        <Header.Subheader>{item.blockNumber}</Header.Subheader>
                                                    </Header.Content>
                                                </Header>
                                            </Segment>
                                            <Segment>
                                                <Header as='h5'>
                                                    <Header.Content>
                                                        Fiyat
                                                        <Header.Subheader>{item.returnValues.fiyat}</Header.Subheader>
                                                    </Header.Content>
                                                </Header>
                                            </Segment>
                                        </Segment.Group>
                                         <Segment>
                                                <Header as='h5'>
                                                    <Header.Content>
                                                        Tarih
                                                        <Header.Subheader>{blockTimeStampToDate(item.returnValues.zaman)}</Header.Subheader>
                                                    </Header.Content>
                                                </Header>
                                            </Segment>
                                        <Segment>
                                            <Header as='h5'>
                                                <Header.Content>
                                                    Satıcı
                                                    <Header.Subheader>{item.returnValues.satici}</Header.Subheader>
                                                </Header.Content>
                                            </Header>
                                        </Segment>
                                        <Segment>
                                            <Header as='h5'>
                                                <Header.Content>
                                                    Alıcı
                                                    <Header.Subheader>{item.returnValues.alici}</Header.Subheader>
                                                </Header.Content>
                                            </Header>
                                        </Segment>
                                    </Segment.Group>
                                </Segment>
                                <Segment style={{ 'border': 'none', 'padding': '0px', 'margin-top': '130px', 'margin-right':'-25px' }}>  <Icon name='chain' size='large' /></Segment>
                            </Segment.Group>
                        </Grid.Column>
                    })}
                </Grid> : 'Blokzincirde bu hisse için tarih verisi bulunmuyor'
            }
        </Modal.Content>
        <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Kapat</Button>
        </Modal.Actions>
    </Modal>
    )
}

ChainModal.propTypes = {
    hisseId: PropTypes.any,
}

export default ChainModal
