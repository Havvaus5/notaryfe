import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { blockTimeStampToDate, getErrorMessage, getPropositionContract, getRealEstateSaleAd } from '../../ethereum/utils';
import { Button, Card, Divider, Header, Icon, Table, Segment, Message } from 'semantic-ui-react'
import { ALICI_ICIN_KILITLENDI, ALICI_ONAYI_ILE_KILIT_KALDIRMA, getIlanDurum, HISSEDARLAR_ARASINDA_MUTABAKAT_SAGLANAMADI, PROP_STATE_BEKLEMEDE, YAYINDA } from '../util';
import FiyatDegistirModal from './FiyatDegistirModal';
import { UserContext } from '../../App';

function IlanBilgileri() {
    const { ilanId } = useParams();
    const { web3, currentAccount, setTxReceipt } = useContext(UserContext);
    const contract = getPropositionContract(web3);
    const realEstateSaleAd = getRealEstateSaleAd(web3);

    const [propositionList, setPropositionList] = useState(null);
    const [hisseAdData, setHisseAdData] = useState(null);

    useEffect(() => {
        const ilanIdChanged = hisseAdData !== null && hisseAdData.ilanId !== ilanId;
        if (hisseAdData == null || propositionList == null || ilanIdChanged) {
            getHisseAdDataById();
            getIlanTeklifList();
        }
    }, [currentAccount, ilanId]);

    async function getHisseAdDataById() {
        try {
            const result = await realEstateSaleAd.methods.getHisseAdDataById(ilanId).call();
            setHisseAdData(result);
        } catch (err) {
            alert(getErrorMessage(err));
        }
        return null;
    }

    async function getIlanTeklifList() {
        try {
            const result = await contract.methods.getIlanTeklifList(ilanId).call();
            setPropositionList(result);
        } catch (err) {
            alert(getErrorMessage(err));
        }
        return null;
    }

    async function teklifKabulEt(propId) {
        try {
            await contract.methods.teklifKabulEt(propId).send({ from: currentAccount })
                .once('receipt', function (receipt) {
                    setTxReceipt(receipt);
                })
            await getIlanTeklifList();
            await getHisseAdDataById();
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function teklifReddet(propId) {
        try {
            await contract.methods.teklifReddet(propId).send({ from: currentAccount })
                .once('receipt', function (receipt) {
                    setTxReceipt(receipt);
                })
            await getIlanTeklifList();
            await getHisseAdDataById();
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function ilanYayindanKaldir() {
        try {
            await realEstateSaleAd.methods.ilanYayindanKaldir(ilanId).send({ from: currentAccount })
                .once('receipt', function (receipt) {
                    setTxReceipt(receipt);
                })
            await getIlanTeklifList();
            await getHisseAdDataById();
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function changeSatisFiyat(yeniFiyat) {
        try {
            await realEstateSaleAd.methods.changeSatisFiyat(ilanId, yeniFiyat).send({ from: currentAccount })
                .once('receipt', function (receipt) {
                    setTxReceipt(receipt);
                })
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function kilitKaldirWithSaticiOnayi() {
        try {
            await realEstateSaleAd.methods.kilitKaldirWithSaticiOnayi(ilanId).send({ from: currentAccount })
                .once('receipt', function (receipt) {
                    setTxReceipt(receipt);
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
            {hisseAdData != null && hisseAdData.ad != null ? <Table definition>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width={2}>Satış fiyat</Table.Cell>
                        <Table.Cell>{`${hisseAdData.ad.fiyat} TL`}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Rayiç Bedeli</Table.Cell>
                        <Table.Cell>{`${hisseAdData.ad.rayicBedeli} TL`}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Durum</Table.Cell>
                        <Table.Cell>{getIlanDurum(hisseAdData.ad.state)}</Table.Cell>
                    </Table.Row>
                    {hisseAdData.ad.state === ALICI_ICIN_KILITLENDI ? <Table.Row>
                        <Table.Cell>Alıcı Para Transferi</Table.Cell>
                        <Table.Cell>{hisseAdData.ad.aliciParaTransferi ? 'Yapıldı' : 'Yapılmadı'}</Table.Cell>
                    </Table.Row> : ''}
                    {hisseAdData.ad.state === ALICI_ICIN_KILITLENDI ?
                        <Table.Row>
                            <Table.Cell>Satıcı Tapu Harcı Ödemesi</Table.Cell>
                            <Table.Cell>{hisseAdData.ad.saticiParaTransferi ? 'Yapıldı' : 'Yapılmadı'}</Table.Cell>
                        </Table.Row> : ''}
                    <Table.Row>
                        <Table.Cell>İşlemler</Table.Cell>
                        <Table.Cell> <Button primary disabled={!(hisseAdData.ad.state === YAYINDA || hisseAdData.ad.state === HISSEDARLAR_ARASINDA_MUTABAKAT_SAGLANAMADI )} onClick={() => ilanYayindanKaldir()}>{hisseAdData.ad.state === HISSEDARLAR_ARASINDA_MUTABAKAT_SAGLANAMADI ? 'Askıdaki İlanın Kaldırılmasını Onayla' : 'İlandan Kaldır'}</Button>
                            {hisseAdData.ad.state !== HISSEDARLAR_ARASINDA_MUTABAKAT_SAGLANAMADI ? <FiyatDegistirModal changeSatisFiyat={changeSatisFiyat}  /> : ''}
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
                                <Card.Header>Teklif Tarih</Card.Header>
                                <Card.Meta>
                                    {blockTimeStampToDate(item.ilanId)}
                                </Card.Meta>
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

export default IlanBilgileri
