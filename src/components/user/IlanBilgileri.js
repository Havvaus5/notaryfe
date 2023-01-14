import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { useLocation, useParams } from 'react-router-dom'
import { getErrorMessage, getPropositionContract, getRealEstateSaleAd } from '../../ethereum/utils';
import { Button, Card, Label, Divider, Header, Icon, Table, List, Segment, Grid, Message } from 'semantic-ui-react'
import { ALICI_ONAYI_ILE_KILIT_KALDIRMA, getIlanDurum, PROP_STATE_BEKLEMEDE } from '../util';

function IlanBilgileri(props) {
    const { ilanId } = useParams();
    const { state } = useLocation();
    const contract = getPropositionContract(props.web3);
    const realEstateSaleAd = getRealEstateSaleAd(props.web3);

    const [propositionList, setPropositionList] = useState(null);
    const [hisseAdData, setHisseAdData] = useState(null);
    let teklifSayisi = 0;

    useEffect(() => {
        if (hisseAdData == null || (hisseAdData != null && hisseAdData.ilanId != ilanId)) {
            if (!state) {
                
            } else {
                setHisseAdData(state);
            }
        }
        setHisseAdData(getHisseAdDataById());
        getIlanTeklifList();
        teklifSayisi = 0;

    }, [props.currentAccount, ilanId, propositionList]);

    async function getHisseAdDataById() {
        try {
            const result = await contract.methods.getHisseAdDataById(ilanId).call();
            return result;
        } catch (err) {
            alert(getErrorMessage(err));
        }
        return null;
    }

    async function getIlanTeklifList() {
        try {
            const propList = await contract.methods.getIlanTeklifList(ilanId).call();
            setPropositionList(propList);
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function teklifKabulEt(propId) {
        try {
            await contract.methods.teklifKabulEt(propId).send({ from: props.currentAccount })
                .once('receipt', function (receipt) {
                    console.log('Transaction receipt received', receipt)
                })
            await getIlanTeklifList();
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function teklifReddet(propId) {
        try {
            await contract.methods.teklifReddet(propId).send({ from: props.currentAccount })
                .once('receipt', function (receipt) {
                    console.log('Transaction receipt received', receipt)
                })
            await getIlanTeklifList();
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function ilanYayindanKaldir() {
        try {
            await realEstateSaleAd.methods.ilanYayindanKaldir(ilanId).send({ from: props.currentAccount })
                .once('receipt', function (receipt) {
                    console.log('Transaction receipt received', receipt)
                })
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function changeSatisFiyat() {
        try {
            //TODO
            await realEstateSaleAd.methods.changeSatisFiyat(ilanId, 5).send({ from: props.currentAccount })
                .once('receipt', function (receipt) {
                    console.log('Transaction receipt received', receipt)
                })
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function kilitKaldirWithSaticiOnayi() {
        try {
            await realEstateSaleAd.methods.kilitKaldirWithSaticiOnayi(ilanId).send({ from: props.currentAccount })
                .once('receipt', function (receipt) {
                    console.log('Transaction receipt received', receipt)
                })
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    return (
        <React.Fragment>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='tag' />
                    İlan Bilgileri
                </Header>
            </Divider>
            {hisseAdData != null ? <Table definition>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width={2}>Satış fiyat</Table.Cell>
                        <Table.Cell>{hisseAdData.ad.fiyat}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Rayiç Bedeli</Table.Cell>
                        <Table.Cell>{hisseAdData.ad.rayicBedeli}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Durum</Table.Cell>
                        <Table.Cell>{getIlanDurum(hisseAdData.ad.state)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Alıcı Para Transferi</Table.Cell>
                        <Table.Cell>{hisseAdData.ad.aliciParaTransferi ? 'Yapıldı' : 'Yapılmadı'}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Satıcı Tapu Harcı Ödemesi</Table.Cell>
                        <Table.Cell>{hisseAdData.ad.saticiParaTransferi ? 'Yapıldı' : 'Yapılmadı'}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>İşlemler</Table.Cell>
                        <Table.Cell> <Button primary onClick={() => ilanYayindanKaldir()}>İlandan Kaldır</Button>
                            <Button primary onClick={() => changeSatisFiyat()}>Satış fiyatı değiştir</Button>
                            {hisseAdData.ad.state === ALICI_ONAYI_ILE_KILIT_KALDIRMA ? <Button primary onClick={() => kilitKaldirWithSaticiOnayi()}>Satıcı onayı ile kilit kaldır</Button> : ''}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
                : ''
            }

            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='bar chart' />
                    Teklifler
                </Header>
            </Divider>
            {
                propositionList == null ? <Header>İlan için teklif bulunmamaktadır</Header> : <Card.Group>
                    {propositionList.map(item => {

                        return item.state === PROP_STATE_BEKLEMEDE ? <Card key={item.propId}>
                            <Card.Content>
                                <Card.Header>{`Tarih: ${item.tarih}`}</Card.Header>

                            </Card.Content>
                            <Card.Content extra>
                                <Card.Description>
                                    <Segment vertical>

                                        {`Teklif No: ${item.propId}`}
                                    </Segment>
                                    <Segment vertical>
                                        <Message negative>
                                            <Message.Header>{`Teklif Edilen Fiyat: ${item.fiyat} TL`}</Message.Header>

                                        </Message>
                                    </Segment>


                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button basic color='green' onClick={() => teklifKabulEt(item.propId)}>
                                        Kabul et
                                    </Button>
                                    <Button basic color='red' onClick={() => teklifReddet(item.propId)}>
                                        Reddet
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card> : ''
                    })}
                </Card.Group>
            }
        </React.Fragment>
    )
}

IlanBilgileri.propTypes = {
    hisseInfo: PropTypes.any,
    currentAccount: PropTypes.any,
}

export default IlanBilgileri
