import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actionCreators as layoutActionCreators } from '../../pages/login/store'
import menuList from '../../config/menuConfig';
import './style.less';
import { Modal } from 'antd';
import LinkButton from '../../components/link-button';


function Header(props) {
    // dispatch to props
    const { layoutDispatch } = props;
    // state to props
    const { userItem } = props;
    const userItemJS = userItem ? userItem.toJS() : [];
    const userName = userItemJS.user[0].realName
    // console.log(userItemJS.user[0])

    // 获取标题
    const getTitle = () => {
        const path = props.location.pathname;
        let title;
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title;
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title;
                }
            }
        })
        return title
    }

    const logout = () => {
        Modal.confirm({
            title: '确定退出吗?',
            onOk() {
                layoutDispatch()
                console.log(props)
                props.history.replace('/login')
            },
            // onCancel() {
            //     console.log('Cancel');
            // }
        })
    }
    return (
        <div className='header-nav'>
            <div className='header-top'>
                <span>欢迎，{userName}</span>
                <LinkButton onClick={logout}>退出</LinkButton>
                {/* <a href='javascrip:' onClick={logout}>退出</a> */}
            </div>
            <div className='header-bottom'>
                <div className='header-bottom-left'>{getTitle()}</div>
                <div className='header-bottom-right'>
                    {/* <span>time</span>
                    <img src=''></img>
                    <span>yu</span> */}
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    userItem: state.getIn(['userList', 'userItem']),
})

const mapDispatchToProps = (dispatch) => {
    return {
        layoutDispatch() {
            dispatch(layoutActionCreators.postLayoutRequest());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(withRouter(Header)))