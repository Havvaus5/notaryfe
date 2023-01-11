import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'semantic-ui-react'
import { getErrorMessage, getRealEstateSaleAd } from '../../ethereum/utils';

function OnayPage(props) {
    const [onayBekleyenList, setOnayBekleyenList] = useState(null);
    const contract = getRealEstateSaleAd(props.web3);
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
                    console.log('Transaction receipt received', receipt)
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
                    console.log('Transaction receipt received', receipt)
                });
            await getOnayList();
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    return (
        <React.Fragment>{props.isAdmin && onayBekleyenList ? <Card.Group>
            {onayBekleyenList.map(item => {
                return <Card>
                    <Card.Content>
                        <Card.Header>{`İlan Id: ${item.ilanId}`}</Card.Header>
                        <Card.Description>
                            <div>
                                Satıcı Adres <strong>{item.ad.satici}</strong>
                                Alıcı Adres <strong>{item.ad.alici}</strong>
                                İlan Fiyat <strong>{item.ad.fiyat}</strong>
                            </div>
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
        </Card.Group> : ' '}
        </React.Fragment>
    )
}

OnayPage.propTypes = {
    userAccount: PropTypes.any,
    web3: PropTypes.any,
    isAdmin: PropTypes.bool,
}

export default OnayPage
