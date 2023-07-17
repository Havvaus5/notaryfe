import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Label, Table, Header } from 'semantic-ui-react'
import { blockTimeStampToDate, getErrorMessage, getHissedarOnay, getRealEstateSaleAd } from '../../ethereum/utils';
import { PROP_STATE_BEKLEMEDE, getIlIlce, getRealEstateAdres, getTasinmazTipNitelik } from '../util';
import { UserContext } from '../../App';


function HissedarOnayPage() {
    const { web3, currentAccount, setTxReceipt } = useContext(UserContext);
    const [onayBekleyenList, setOnayBekleyenList] = useState(null);

    const contract = getHissedarOnay(web3);
    const realEstateSaleAd = getRealEstateSaleAd(web3);

    useEffect(() => {
        if (onayBekleyenList == null) {
            getOnayList();
        }
    }, []);

    async function getOnayList() {
        try {
            const res = await contract.methods.getOnaylanacakVeri().call({ from: currentAccount });
            setOnayBekleyenList(res);
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function onayVer(onayID, ilanId) {
        try {
            await realEstateSaleAd.methods.onayVer(onayID, ilanId).send({ from: currentAccount })
                .once('receipt', function (receipt) {
                    setTxReceipt(receipt);
                });
            await getOnayList();
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }
    
    async function reddet(onayID, ilanId) {
        try {
            await realEstateSaleAd.methods.reddet(onayID, ilanId).send({ from: currentAccount })
                .once('receipt', function (receipt) {
                    setTxReceipt(receipt);
                });
            await getOnayList();
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function ilanDurumGuncelle(ilanID) {
        try {
            await realEstateSaleAd.methods.ilanDurumuGuncelle(ilanID).send({ from: currentAccount })
                .once('receipt', function (receipt) {
                    setTxReceipt(receipt);
                });
            await getOnayList();
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }    

    return (
        <React.Fragment>
            {onayBekleyenList == null ? <Header>Hisseli gayrimenkul satışı için onay bulunmamaktadır</Header> : <Card.Group>
                {onayBekleyenList.map(item => {
                    return item.onayData.onayDurum === PROP_STATE_BEKLEMEDE  ? <Card key={item.propId}>
                        <Card.Content>
                            <Card.Header>Onay İsteme Tarih</Card.Header>
                            <Card.Meta>
                                {blockTimeStampToDate(item.onayData.realEstateAdId)}
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content>
                                <Card.Description>
                                    <Table basic='very' celled collapsing>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell width={2}>Mahalle/Sokak</Table.Cell>
                                                <Table.Cell>{getRealEstateAdres(item.realEstateData)}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>İl/ilçe</Table.Cell>
                                                <Table.Cell>{getIlIlce(item.realEstateData)}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>Taşınmaz Tip/Nitelik</Table.Cell>
                                                <Table.Cell>{getTasinmazTipNitelik(item.realEstateData)}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>Sahip Olduğunuz Hisse Oranı</Table.Cell>
                                                <Table.Cell>{item.onayData.hissePay}/{item.realEstateData.payda}</Table.Cell>
                                            </Table.Row>
                                            {/* <Table.Row>
                                                <Table.Cell>Satışa Çıkan Hisse Oranı</Table.Cell>
                                                <Table.Cell>{item.onayData.satisaCikanHisseOran}/{item.realEstateData.payda}</Table.Cell>
                                            </Table.Row> */}
                                            <Table.Row>
                                                <Table.Cell>Satış fiyatı</Table.Cell>
                                                <Table.Cell><Label as='a' tag>{`${item.onayData.fiyat} TL`}</Label></Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Card.Description>
                            </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button basic color='green' onClick={() => onayVer(item.onayID,item.onayData.realEstateAdId)}>
                                    Kabul et
                                </Button>
                                <Button basic color='red' onClick={() => reddet(item.onayID, item.onayData.realEstateAdId)}>
                                    Reddet
                                </Button>
                            </div>
                        </Card.Content>
                    </Card> : ''
                })}
            </Card.Group>}
        </React.Fragment>
    )
}

export default HissedarOnayPage
