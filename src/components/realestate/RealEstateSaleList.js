import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Card } from 'semantic-ui-react';


function RealEstateSaleList(props) {
    const extra =  <div className='ui two buttons'>
    <Button primary>
      Teklif Gönder
    </Button>
  </div>;
    const {cardInfo} = props;
    return (
        <Card
        image='/public/scottish-terrier.jpeg'
        header={cardInfo.header}
        meta={cardInfo.meta}
        description={cardInfo.description}
        extra={extra}
      />    );
}

export default RealEstateSaleList;

RealEstateSaleList.propTypes = {
    cardInfo: PropTypes.any,
};