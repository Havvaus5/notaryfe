import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Label, Table } from 'semantic-ui-react'
import { blockTimeStampToDate, getErrorMessage, getRealEstateSaleAd } from '../../ethereum/utils';
import TeklifGonderModal from './TeklifGonderModal';
import { getIlIlce, getRealEstateAdres, getTasinmazTipNitelik } from '../util';
import ChainModal from '../common/ChainModal';

function Advertisements(props) {
    const contract = getRealEstateSaleAd(props.web3);
    const [adList, setAdList] = useState(null);

    useEffect(() => {
        getAllAds();
    }, [props.currentAccount]);

    async function getAllAds() {
        try {
            const res = await contract.methods.getAllAds().call();
            setAdList(res);
            console.log(props.currentAccount !== res[0].ad.satici);
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    return (
        <React.Fragment>
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
                                {props.currentAccount.toUpperCase() !== item.ad.satici.toUpperCase() ?
                                    <TeklifGonderModal ilanId={item.ilanId} {...props} />
                                    : ''}
                                <ChainModal hisseId={item.hisseId} {...props}/>
                            </Card.Content>
                        </Card>
                    })}

                </Card.Group>
            }
        </React.Fragment>
    )
}

Advertisements.propTypes = {
    currentAccount: PropTypes.any,
    web3: PropTypes.any,
}

export default Advertisements
