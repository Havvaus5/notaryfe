import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Message } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom"
import { getErrorMessage, getRealEstateSaleAd } from '../../ethereum/utils';
import { ALICI_ICIN_KILITLENDI, YAYINDA } from '../util';
import IlanOlusturModal from './IlanOlusturModal';

function UserHisseList(props) {
    const [hisseList, setHisseList] = useState(null);
    const contract = getRealEstateSaleAd(props.web3);
    let navigate = useNavigate();
    useEffect(() => {
        if (hisseList == null) {
            getAssets();
        }

    }, [props.userAccount]);

    async function getAssets() {
        try {
            const ownerHisseInfos = await contract.methods.getUserAssets(props.userAccount).call();
            setHisseList(ownerHisseInfos);
        } catch (err) {
            console.log(err.message);
        }
    }

    async function ilanOlustur(item, amount) {
        try {
            await contract.methods.ilanOlustur(item.hisseId, amount, amount, false).send({ from: props.userAccount })
                .once('receipt', function (receipt) {
                    console.log('Transaction receipt received', receipt)
                });
            await getAssets();
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function ilanYayindanKaldir(item) {
        try {
            await contract.methods.ilanYayindanKaldir(item.ilanId).send({ from: props.userAccount })
                .once('receipt', function (receipt) {
                    console.log('Transaction receipt received', receipt)
                })
            await getAssets();
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    const getAdButton = item => {
        if (item.ilanId == 0) {
            return <IlanOlusturModal hisse={item} ilanOlustur={ilanOlustur} />
        } else {
            if (item.ad.state == YAYINDA) {
                <Button
                type='submit'
                onClick={() => {
                  navigate(`/user-ilan/${item.ilanId}`)
                }}
              >
                İlan Bilgileri
              </Button>
                //return <Button primary onClick={() => ilanYayindanKaldir(item)}>İlandan Kaldır</Button>
            } else if (item.ad.state == ALICI_ICIN_KILITLENDI) {
                return <Button primar disable>Alıcı için kitlendi</Button>
            }
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
    userAccount: PropTypes.any,
    web3: PropTypes.any,
}

export default UserHisseList
