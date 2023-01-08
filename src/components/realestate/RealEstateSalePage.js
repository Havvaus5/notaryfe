import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CardGroup, Card } from 'semantic-ui-react';
import RealEstateSaleList from './RealEstateSaleList';


function RealEstateSalePage(props) {
    const [saleList, setSaleList] = useState([]);

    useEffect(() => {
        let tempSaleList = [];
        for (let i = 0; i < 15; i++) {
            const dummy = 'dummyName' + i;

            const element = { header: dummy, meta: dummy, description: dummy };
            tempSaleList.push(element);
        }
        setSaleList(tempSaleList);
    }, []);

    return (
        <Card.Group>
            {saleList.map((item) =>
             <RealEstateSaleList cardInfo={item}/>
            )}
        </Card.Group>
    );
}

export default RealEstateSalePage;


RealEstateSalePage.propTypes = {

};