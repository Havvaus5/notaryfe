import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CardGroup, Card } from 'semantic-ui-react';  
import PropTypes from 'prop-types';

function UserHisse(props) {
    return (
        <div>
            {props.hisseInfo}
        </div>
    );
}


UserHisse.propTypes = {
    hisseInfo: PropTypes.any,
};


export default UserHisse;