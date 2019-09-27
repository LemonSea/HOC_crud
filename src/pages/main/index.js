import React, { useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import './style.less';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';

function Main(props) {
    // dispatch to props
    const {  } = props;
    // state to props
    const { userItem } = props;
    const userItemJS = userItem ? userItem.toJS() : [];

    if(userItemJS.loginStatus!==0){
        return <Redirect to='/login' />
    }else{
        return (
            console.log(userItemJS.user[0]),
            <div>
                hello {userItemJS.user[0].account}
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    userItem: state.getIn(['login', 'userItem']),
    // loginStatus: state.getIn(['login', 'userItem', 'loginStatus']),
})

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Main))