import React from 'react';
import PropTypes from 'prop-types';
import RealEstate from './RealEstate';
import { REAL_ESTATE_EKLE } from '../util';

function RealEstateEkle(props) {
 
  return (
    <RealEstate submitType={REAL_ESTATE_EKLE} {...props}/>
  );

}

export default RealEstateEkle;

RealEstateEkle.propTypes = {
  currentAccount: PropTypes.any,
  web3: PropTypes.any,
  isAdmin: PropTypes.bool,
  submitType: PropTypes.any,
  setRealEstateId: PropTypes.func,
};