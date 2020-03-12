/* eslint-disable react/react-in-jsx-scope */
import React from 'react'
import { connect } from 'react-redux'
import { Popconfirm, Button } from 'antd';
import { BLOCK_USER } from './redux/action-types';
import { blockUserAction } from './redux/actions'


class BlockUser extends React.Component {
    state = {
        blockedUsers : []
    }
    onblockUser = (content) => {
        alert(`Пользователь с ID = ${content.id} заблокирован`);
        console.log(content);
        this.props.blockUser(content)
      }
    render () {
        const {
            content = {},
            block,
        } = this.props
        return (
            <Popconfirm
                title="Вы уверены что хотите заблокировать пользователя?"
                onConfirm={() =>{this.onblockUser(content); console.log(this.props)}}
                okText="Да"
                cancelText="Нет"
            >
                <Button type='danger' > Заблокировать пользователя </Button>
            </Popconfirm>
        )
    }
};
const mapStateToProps = state =>{
    return{
        block: state.modal.block,
        content: state.modal.content,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        blockUser: (content) => {
            let action = blockUserAction();
            action.block = content.id
            dispatch(action)
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlockUser)