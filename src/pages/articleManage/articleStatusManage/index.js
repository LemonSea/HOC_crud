import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import './style.less';
import {
    Card,
    Table,
    Button,
    Icon
} from 'antd';
import LinkButton from '../../../components/link-button';

function ArticleStatusWrite(props) {
    // dispatch to props
    const { getArticleStatusDispatch } = props;
    // state to props
    const { articleStatusList } = props;
    const articleStatusListJS = articleStatusList ? articleStatusList.toJS() : [];

    useEffect(() => {
        getArticleStatusDispatch()
    }, [])

    // mock 数据
    // 数据源
    const dataSource = articleStatusListJS;
    // 字段（列）
    const columns = [
        {
            title: '状态名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            width: 300,
            render: () => (
                <span>
                    <LinkButton>修改</LinkButton>
                    <LinkButton>删除</LinkButton>
                </span>
            ),
        },
    ];

    let title = '文章分类列表';
    const extra = (
        <Button type='primary'>
            <Icon type='plus'></Icon>
            添加
        </Button>
    )

    return (
        <Card title={title} extra={extra} style={{ width: '100%' }}>
            <Table
                bordered
                rowKey='id'
                dataSource={dataSource}
                columns={columns}
            />;
        </Card>
    )
}


const mapStateToProps = (state) => ({
    articleStatusList: state.getIn(['articleStatusList', 'articleStatus']),
})

const mapDispatchToProps = (dispatch) => {
    return {
        getArticleStatusDispatch() {
            dispatch(actionCreators.getArticleStatusRequest());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ArticleStatusWrite))