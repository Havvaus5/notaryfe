import React, { useContext, useEffect, useState } from 'react';
import { Card, Label, Table } from 'semantic-ui-react'
import { blockTimeStampToDate, getErrorMessage, getRealEstateSaleAd } from '../../ethereum/utils';
import TeklifGonderModal from './TeklifGonderModal';
import { YAYINDA, getIlIlce, getRealEstateAdres, getTasinmazTipNitelik } from '../util';
import ChainModal from '../common/ChainModal';
import { UserContext } from '../../App';

function Advertisements() {
    const {web3, currentAccount } = useContext(UserContext);
    const contract = getRealEstateSaleAd(web3);
    const [adList, setAdList] = useState(null);

    useEffect(() => {
        getAllAds();
    }, [currentAccount]);

    async function getAllAds() {
        try {
            const res = await contract.methods.getAllAds().call();
            setAdList(res);
            console.log(currentAccount !== res[0].ad.satici);
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    return (
        <React.Fragment>
            {adList == null ? '' :
                <Card.Group>
                    {adList.map(item => {
                        return item.ad.state === YAYINDA ? <Card color='yellow' key={item.ilanId}>
                            <Card.Content>
                                {/* <Image
                                    floated='right'
                                    size='mini'
                                    src='/images/ilan.jpg'
                                /> */}
                                <Card.Header>İlan Tarih</Card.Header>
                                <Card.Meta>
                                    {blockTimeStampToDate(item.ilanId)}
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
                                                <Table.Cell>Hisse Oranı</Table.Cell>
                                                <Table.Cell>{item.hisse.pay}/{item.realEstateData.payda}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>Satış fiyatı</Table.Cell>
                                                <Table.Cell><Label as='a' tag>{`${item.ad.fiyat} TL`}</Label></Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                {currentAccount.toUpperCase() !== item.ad.satici.toUpperCase() ?
                                    <TeklifGonderModal ilanId={item.ilanId} />
                                    : ''}
                                <ChainModal hisseId={item.hisseId} />
                            </Card.Content>
                        </Card> : ''
                    })}

                </Card.Group>
            }
        </React.Fragment>
    )
}

export default Advertisements
