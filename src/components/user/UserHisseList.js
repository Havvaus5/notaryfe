import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom"
import { getErrorMessage, getRealEstateSaleAd } from '../../ethereum/utils';
import { ALICI_ICIN_KILITLENDI, YAYINDA, YAYINDA_DEGIL } from '../util';
import IlanOlusturModal from './IlanOlusturModal';

function UserHisseList(props) {
    const [hisseList, setHisseList] = useState(null);
    const contract = getRealEstateSaleAd(props.web3);
    let navigate = useNavigate();

    useEffect(() => {
        getAssets();
    }, [props.currentAccount]);

    async function getAssets() {
        try {
            const ownerHisseInfos = await contract.methods.getUserAssets(props.currentAccount).call();
            setHisseList(ownerHisseInfos);
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function ilanOlustur(item, amount) {
        try {
            await contract.methods.ilanOlustur(item.hisseId, amount, amount, false).send({ from: props.currentAccount })
                .once('receipt', function (receipt) {
                    console.log('Transaction receipt received', receipt)
                });
            await getAssets();
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }


    const getAdButton = item => {
        if (item.ad.state === YAYINDA_DEGIL) {
            return <IlanOlusturModal hisse={item} ilanOlustur={ilanOlustur} />
        } else if (item.ad.state === YAYINDA) {
            return <Button
                type='submit'
                onClick={() => {
                    navigate(`/notary/user-ilan/${item.ilanId}`, {state: item})
                }}
            >
                İlan Bilgileri
            </Button>
        } else if (item.ad.state === ALICI_ICIN_KILITLENDI) {
            return <Button primar disable>Alıcı için kitlendi</Button>
        }
    }


    return (
        <>
            {hisseList == null ? ' ' :
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Mahalle</Table.HeaderCell>
                            <Table.HeaderCell>Pay</Table.HeaderCell>
                            <Table.HeaderCell>İlan Durumu</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            hisseList.map(item => {
                                return <Table.Row>
                                    <Table.Cell>{item.realEstateData.mahalle}</Table.Cell>
                                    <Table.Cell>{item.hisse.pay}</Table.Cell>
                                    <Table.Cell>{getAdButton(item)} </Table.Cell>
                                </Table.Row>;
                            })
                        }
                    </Table.Body>

                </Table>
            }
        </>
    );
}

UserHisseList.propTypes = {
    currentAccount: PropTypes.any,
    web3: PropTypes.any,
}

export default UserHisseList
