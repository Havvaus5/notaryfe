import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, List, Image, Label, Table } from 'semantic-ui-react'
import { getErrorMessage, getRealEstateSaleAd } from '../../ethereum/utils';
import TeklifGonderModal from './TeklifGonderModal';

function Advertisements(props) {
    const [adList, setAdList] = useState(null);
    const contract = getRealEstateSaleAd(props.web3);
    useEffect(() => {
        if (adList == null) {
            getAllAds();
        }

    }, [props.currentAccount, adList]);

    async function getAllAds() {
        try {
            const res = await contract.methods.getAllAds().call();
            setAdList(res);
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    const getRealEstateAdres = (item) => {
        return `${item.mahalle} mahallesi 1165.cadd 49/27`;
    }

    const getIlIlce = item => {
        return 'Çankaya/Ankara';
    }

    const getTasinmazTipNitelik = item => {
        return 'Ana taşınmaz / Tarla';
    }
    return (
        <>
            {adList == null ? '' :
                <Card.Group>
                    {adList.map(item => {
                        return <Card color='yellow' key={item.ilanId}>
                            <Card.Content>
                            {/* <Image
                                    floated='right'
                                    size='mini'
                                    src='/images/ilan.jpg'
                                /> */}
                                <Card.Header>İlan Tarih</Card.Header>
                                <Card.Meta>
                                    {item.ilanId}
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
                                                <Table.Cell><Label as='a' tag>{item.ad.fiyat}</Label></Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <TeklifGonderModal ilanId={item.ilanId} web3={props.web3} currentAccount={props.currentAccount} />
                                
                            </Card.Content>
                        </Card>
                    })}

                </Card.Group>
            }
        </>
    )
}

Advertisements.propTypes = {
    currentAccount: PropTypes.any,
    web3: PropTypes.any,
}

export default Advertisements
