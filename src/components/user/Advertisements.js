import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'semantic-ui-react'
import { getErrorMessage, getRealEstateSaleAd } from '../../ethereum/utils';
import TeklifGonderModal from './TeklifGonderModal';

function Advertisements(props) {
    const [adList, setAdList] = useState(null);
    const contract = getRealEstateSaleAd(props.web3);
    useEffect(() => {
        if (adList == null) {
            getAllAds();
        }

    }, []);

    async function getAllAds() {
        try {
            const res = await contract.methods.getAllAds(props.userAccount).call();
            setAdList(res);
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    const teklifGonder = ilanId => {
        return <TeklifGonderModal ilanId={ilanId} web3={props.web3} userAccount={props.userAccount} />
    }

    return (
        <>
            {adList == null ? '' :
                <Card.Group>
                    {adList.map(item => {
                        return <Card>
                            <Card.Content>
                                <Card.Header>{`İlan Bilgisi: ${item.ilanId}`}</Card.Header>
                                <Card.Meta>{`Satıcı adres: ${item.ad.satici}`}</Card.Meta>
                                <Card.Description>
                                    <div>
                                        Adres: <strong>{item.realEstateData.mahalle}</strong>
                                        Hisse: <strong>{item.hisse.pay}/{item.realEstateData.payda}</strong>
                                        Satış Fiyatı <strong>{item.ad.fiyat}</strong>
                                    </div>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                    <Button basic color='green' onClick={() => teklifGonder(item.ilanId)}>
                                        Kabul et
                                    </Button>
                                
                            </Card.Content>
                        </Card>
                    })}

                </Card.Group>
            }
        </>
    )
}

Advertisements.propTypes = {
    userAccount: PropTypes.any,
    web3: PropTypes.any,
}

export default Advertisements
