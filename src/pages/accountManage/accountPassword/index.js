import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import './style.less';

function AccountPassword(props) {
    // dispatch to props
    const { } = props;
    // state to props
    const { } = props;
    // const userItemJS = userItem ? userItem.toJS() : [];
    return(        
        <div>
            AccountPassword
        </div>
    )
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AccountPassword))