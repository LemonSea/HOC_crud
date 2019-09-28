import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import './style.less';

function RoleManage(props) {
    // dispatch to props
    const { } = props;
    // state to props
    const { } = props;
    // const userItemJS = userItem ? userItem.toJS() : [];
    return(        
        <div>
            RoleManage
        </div>
    )
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(RoleManage))