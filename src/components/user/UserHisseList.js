import React, { useEffect, useState, useContext } from 'react';
import { Button, Table } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom"
import { getErrorMessage, getRealEstateSaleAd } from '../../ethereum/utils';
import { ALICI_ICIN_KILITLENDI, getIlIlce, getRealEstateAdres, getPayPayda, YAYINDA, YAYINDA_DEGIL } from '../util';
import IlanOlusturModal from './IlanOlusturModal';
import { UserContext } from '../../App';

function UserHisseList(props) {
    const {web3, currentAccount, setTxReceipt} = useContext(UserContext);

    const contract = getRealEstateSaleAd(web3);
    let navigate = useNavigate();

    const [hisseList, setHisseList] = useState(null);
    
    useEffect(() => {
        getAssets();
    }, [currentAccount]);

    async function getAssets() {
        try {
            const ownerHisseInfos = await contract.methods.getUserAssets(currentAccount).call();
            const filteredList = ownerHisseInfos.filter(filterByHisseId);
            setHisseList(filteredList);
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    function filterByHisseId(item){
        return  item.hisseId !== "0" ;
    }

    async function ilanOlustur(item, amount) {
        try {
            await contract.methods.ilanOlustur(item.hisseId, amount, amount, false).send({ from: currentAccount })
                .once('receipt', function (receipt) {
                    setTxReceipt(receipt);
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
                    navigate(`/notary/user-ilan/${item.ilanId}`, { state: item })
                }}
            >
                İlan Bilgileri
            </Button>
        } else if (item.ad.state === ALICI_ICIN_KILITLENDI) {
            return <Button primary disabled>Alıcı için kitlendi</Button>
        }
    }

    return (
        <>
            {hisseList == null ? ' ' :
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Adres</Table.HeaderCell>
                            <Table.HeaderCell>İl/ilçe</Table.HeaderCell>
                            <Table.HeaderCell>Nitelik</Table.HeaderCell>
                            <Table.HeaderCell>Taşınmaz Tip</Table.HeaderCell>
                            <Table.HeaderCell>Ada</Table.HeaderCell>
                            <Table.HeaderCell>Parsel</Table.HeaderCell>
                            <Table.HeaderCell>Pay</Table.HeaderCell>
                            <Table.HeaderCell>İlan Durumu </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            hisseList.map(item => {
                                return <Table.Row key={item.hisseId}>
                                    <Table.Cell>{getRealEstateAdres(item.realEstateData)}</Table.Cell>
                                    <Table.Cell>{getIlIlce(item.realEstateData)}</Table.Cell>
                                    <Table.Cell>{item.realEstateData.tasinmazTip}</Table.Cell>
                                    <Table.Cell>{item.realEstateData.nitelik}</Table.Cell>
                                    <Table.Cell>{item.realEstateData.ada}</Table.Cell>
                                    <Table.Cell>{item.realEstateData.parsel}</Table.Cell>
                                    <Table.Cell>{getPayPayda(item)}</Table.Cell>
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

export default UserHisseList
