import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getErrorMessage, getRealEstateOwnerRelationContract } from '../../ethereum/utils';
import { Table } from 'semantic-ui-react'
import { getIlIlce, getRealEstateAdres } from '../util';
import NotAdminPage from '../NotAdminPage';
import HissedarModalEkle from './HissedarModalEkle';

function RealEstateTable(props) {
    const { web3, currentAccount, setTxReceipt } = props;
    const reOwnerRelationContract = getRealEstateOwnerRelationContract(web3);
    const [realEstates, setRealEstates] = useState([]);

    useEffect(() => {
        listAllRealEstates();
    }, [props.isAdmin]);

    async function listAllRealEstates() {
        try {
            //const res = await contract.methods.listAllRealestate().call();
            const res = await reOwnerRelationContract.methods.getAllRealEstateAndHisse().call();
            setRealEstates(res);
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    async function addHissedarRealEstate(realEstateHissedarInfo) {
        try {
          await reOwnerRelationContract.methods.addOwnerShip(realEstateHissedarInfo.ownAdd, realEstateHissedarInfo.realEstateId, realEstateHissedarInfo.hisse).send({ from: currentAccount })
            .once('receipt', function (receipt) {
              setTxReceipt(receipt);
              listAllRealEstates();
            });
        } catch (err) {
          alert(getErrorMessage(err));
        }
      }

    return (
        <React.Fragment>
            {props.isAdmin ? <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Adres</Table.HeaderCell>
                        <Table.HeaderCell>İl/ilçe</Table.HeaderCell>
                        <Table.HeaderCell>Taşınmaz Tip</Table.HeaderCell>
                        <Table.HeaderCell>Nitelik</Table.HeaderCell>
                        <Table.HeaderCell>Ada</Table.HeaderCell>
                        <Table.HeaderCell>Parsel</Table.HeaderCell>
                        <Table.HeaderCell>Payda</Table.HeaderCell>
                        <Table.HeaderCell>Pay</Table.HeaderCell>
                        <Table.HeaderCell>Mülk Sahibi</Table.HeaderCell>
                        <Table.HeaderCell>İşlem</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        realEstates.map(item => {
                            return item.realEstateId == 0 ? '' : <Table.Row key={item.hisseId == 0 ? item.realEstateData.realEstateId : item.hisseId}>
                                <Table.Cell>{getRealEstateAdres(item.realEstateData)}</Table.Cell>
                                <Table.Cell>{getIlIlce(item.realEstateData)}</Table.Cell>
                                <Table.Cell>{item.realEstateData.tasinmazTip}</Table.Cell>
                                <Table.Cell>{item.realEstateData.nitelik}</Table.Cell>
                                <Table.Cell>{item.realEstateData.ada}</Table.Cell>
                                <Table.Cell>{item.realEstateData.parsel}</Table.Cell>
                                <Table.Cell>{item.realEstateData.payda}</Table.Cell>
                                <Table.Cell>{item.hisseId== 0 ? '' : item.hisse.pay}</Table.Cell>
                                <Table.Cell>{item.hisseId== 0 ? '' : item.hisse.ownerAdd}</Table.Cell>
                                <Table.Cell><HissedarModalEkle disable={item.toplamEklenenHisseMiktar === item.realEstateData.payda} addHissedarRealEstate = {addHissedarRealEstate} realEstateId={item.realEstateId}/></Table.Cell>
                            </Table.Row>;
                        })
                    }
                </Table.Body>
            </Table> : <NotAdminPage />}
        </React.Fragment>
    )
}

RealEstateTable.propTypes = {
    currentAccount: PropTypes.any,
    web3: PropTypes.any,
    isAdmin: PropTypes.bool
}

export default RealEstateTable
