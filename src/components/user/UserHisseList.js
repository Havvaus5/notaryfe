import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CardGroup, Card } from 'semantic-ui-react';  
import UserHisse from './UserHisse';

function UserHisseList(props) {
    const [hisseList, setHisseList] = useState([]);
    
    
    return (
        <Card.Group>
            {hisseList.map((item) =>
             < UserHisse hisseInfo={item}/>
            )}
        </Card.Group>
    );
}

UserHisseList.propTypes = {}

export default UserHisseList
