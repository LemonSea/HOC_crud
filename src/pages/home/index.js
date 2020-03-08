import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import './style.less';

function Home(props) {
    // dispatch to props
    const { } = props;
    // state to props
    const { userItem } = props;
    // const userItemJS = userItem ? userItem.toJS() : [];
    return(        
        <div className='home-dav'>
            欢迎使用后台管理系统
        </div>
    )
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Home))