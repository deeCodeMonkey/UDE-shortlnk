import React from 'react';
import PropTypes from 'prop-types';

//stateless functional component (no state or life-cycle method)
const PrivateHeader = (props) => { 

    //const onLogout = () => {
    //    Accounts.logout();
    //}
        return(
            <div>
                <h1>{props.title}</h1>
                <button onClick={() =>
                    Accounts.logout()
                }>Logout</button>
            </div>
        );
}


PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}

export default PrivateHeader;