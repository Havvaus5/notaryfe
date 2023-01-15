import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Segment } from 'semantic-ui-react'
import { getErrorMessage, getRealEstateSaleAd } from '../../ethereum/utils';
import NotAdminPage from '../NotAdminPage';

function OnayPage(props) {
    const [onayBekleyenList, setOnayBekleyenList] = useState(null);

    const contract = getRealEstateSaleAd(props.web3);
    const { currentAccount, setTxReceipt } = props;
    
    useEffect(() => {
        if (onayBekleyenList == null) {
            getOnayList();
        }
    }, []);

    async function getOnayList() {
        try {
            const res = await contract.methods.getAliciIcinKitlenenIlanlar().call();
            setOnayBekleyenList(res);
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function alicidanParaAlindi(ilanId) {
        try {
            await contract.methods.alicidanParaAlindi(ilanId).send({ from: currentAccount })
                .once('receipt', function (receipt) {
                    setTxReceipt(receipt);
                });
            await getOnayList();
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function saticidanTapuHarciAlindi(ilanId) {
        try {
            await contract.methods.saticidanTapuHarciAlindi(ilanId).send({ from: currentAccount })
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
            {props.isAdmin && onayBekleyenList ? <Card.Group>
            {onayBekleyenList.map(item => {
                return <Card style={{ width: 'fit-content' }}>
                    <Card.Content>
                        <Card.Header>{`İlan Id: ${item.ilanId}`}</Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                        <Card.Description>
                            <Segment vertical>
                                {`Satıcı Adres : ${item.ad.satici}`}
                            </Segment>
                            <Segment vertical>
                                {`Alıcı Adres: ${item.ad.alici}`}
                            </Segment>
                            <Segment vertical>
                                {`Satiş Fiyat: ${item.ad.fiyat} TL`}
                            </Segment>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green' onClick={() => alicidanParaAlindi(item.ilanId)} visible={!item.ad.aliciParaTransferi}>
                                Alıcıdan Para Alındı
                            </Button>
                            <Button basic color='green' onClick={() => saticidanTapuHarciAlindi(item.ilanId)} visible={!item.ad.saticiParaTransferi}>
                                Satıcıdan Tapu Harcı Alındı
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            })}
        </Card.Group> : <NotAdminPage />}
        </React.Fragment>
    )
}

OnayPage.propTypes = {
    currentAccount: PropTypes.any,
    web3: PropTypes.any,
    isAdmin: PropTypes.bool,
}

export default OnayPage
