/* eslint-disable react/react-in-jsx-scope */
import React from 'react'
import { connect } from 'react-redux'
import { Popconfirm, Button } from 'antd';
import { blockUserAction } from './redux/actions'


class BlockUser extends React.Component {
    state = {
        blockedUsers : []
    }
    onblockUser = (content) => {
        alert(`Пользователь с ID = ${content.id} заблокирован`);
        let blockArray = this.state.blockedUsers;
        blockArray.push(content.id);
        blockArray.sort();
        this.setState({blockedUsers: blockArray});
        this.props.blockUser(content,this.state.blockedUsers);
      }
    render () {
        const {
            content = {},
            block,
        } = this.props
        return (
            <Popconfirm
                title="Вы уверены что хотите заблокировать пользователя?"
                onConfirm={() =>{this.onblockUser(content);}}
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
        block: state.modal.blocks,
        content: state.modal.content,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        blockUser: (content,blockedUsers) => {
            let action = blockUserAction();
            action.block = blockedUsers;
            dispatch(action);
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlockUser)