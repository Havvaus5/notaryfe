import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CardGroup, Card } from 'semantic-ui-react';  


function UserHisseList(props) {
    const [hisseList, setHisseList] = useState([]);
    
    useEffect(() => {
        const hisseler = props.getHisses();
        setHisseList(hisseler);
    }, [props.userAccount]);
    
    return (
        // <Card.Group>
        //     {hisseList.map((item) =>
        //         <div>item</div>
        //     )}
        // </Card.Group>
        <div>"Havva"</div>
    );
}

UserHisseList.propTypes = {
    userAccount: PropTypes.any,
    getHisses: PropTypes.func,
}

export default UserHisseList
