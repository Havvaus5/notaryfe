import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { getPropositionContract } from '../../ethereum/utils';

function IlanBilgileri(props) {
    const { ilanId } = useParams();
    const [propositionList, setPropositionList] = useState(null);
    const contract = getPropositionContract(props.web3);

    useEffect(() => {
        if (propositionList == null) {
            getProps();
        }

    }, [props.userAccount, ilanId]);

    async function getProps() {
        try {
            const propList = await contract.methods.getIlanTeklifList(props.userAccount).call();
            setPropositionList(propList);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
    <div>IlanBilgileri</div>
  )
}

IlanBilgileri.propTypes = {}

export default IlanBilgileri
