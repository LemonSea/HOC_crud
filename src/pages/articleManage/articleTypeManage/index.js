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

function ArticleTypeWrite(props) {
    // dispatch to props
    const { getArticleTypeDispatch } = props;
    // state to props
    const { articleTypeList } = props;
    const articleStatusListJS = articleTypeList ? articleTypeList.toJS() : [];

    useEffect(() => {
        getArticleTypeDispatch()
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
            title: '描述',
            dataIndex: 'describe',
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
    articleTypeList: state.getIn(['articleTypeList', 'articleType']),
})

const mapDispatchToProps = (dispatch) => {
    return {
        getArticleTypeDispatch() {
            dispatch(actionCreators.getArticleTypeRequest());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ArticleTypeWrite))