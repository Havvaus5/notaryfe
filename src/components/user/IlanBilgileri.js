import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { getErrorMessage, getPropositionContract } from '../../ethereum/utils';
import { Button, Card } from 'semantic-ui-react'

function IlanBilgileri(props) {
    const { ilanId } = useParams();
    const [propositionList, setPropositionList] = useState(null);
    const contract = getPropositionContract(props.web3);
    const [teklifSayisi, setTeklifSayisi] = useState(0);

    useEffect(() => {
        if (propositionList == null) {
            getProps();
        }

    }, [props.userAccount, ilanId]);

    async function getProps() {
        try {
            const propList = await contract.methods.getIlanTeklifList(props.userAccount).call();
            setPropositionList(propList);
            setTeklifSayisi(0);
        } catch (err) {
            console.log(err.message);
        }
    }

    async function teklifKabulEt(propId ) {
        try {
            await contract.methods.teklifKabulEt(ilanId).send({ from: props.userAccount })
                .once('receipt', function (receipt) {
                    console.log('Transaction receipt received', receipt)
                })
            await getProps();
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function teklifReddet(propId ) {
        try {
            await contract.methods.teklifReddet(ilanId).send({ from: props.userAccount })
                .once('receipt', function (receipt) {
                    console.log('Transaction receipt received', receipt)
                })
            await getProps();
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    return (
        <>
            {propositionList == null ? '' :
                <Card.Group>
                    {propositionList.map(item =>{
                        setTeklifSayisi(teklifSayisi + 1);
                        return <Card>
                        <Card.Content>
                            <Card.Header>{`İlan için teklif: ${teklifSayisi}`}</Card.Header>
                            <Card.Meta>{`Alıcı adres: ${item.alici}`}</Card.Meta>
                            <Card.Description>
                                Alıcı teklifi <strong>{item.fiyat}</strong>
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
                    </Card>
                    })}
                    
                </Card.Group>
            }
        </>

    )
}

IlanBilgileri.propTypes = {
    hisseInfo: PropTypes.any,
    userAccount: PropTypes.any,
}

export default IlanBilgileri
