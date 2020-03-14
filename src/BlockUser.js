/* eslint-disable react/react-in-jsx-scope */
import React from 'react'
import { connect } from 'react-redux'
import { Popconfirm, Button } from 'antd';
import { blockUserAction } from './redux/actions'


class BlockUser extends React.Component {
    state = {
        blockedUsers : [] // массив заблокированных пользователей
    }
    onblockUser = (content) => {
        alert(`Пользователь с ID = ${content.id} заблокирован`);
        let blockArray = this.state.blockedUsers; // Считываю массив заблокированных пользователей из state
        blockArray.push(content.id); // добавляю в массив id пользователя из события onConfirm в <Popconfirm>
        this.setState({blockedUsers: blockArray}); // меняю массив заблокированных пользователей в state
        this.props.blockUser(content,this.state.blockedUsers); // передаю в функцию blockUser, которая находится в mapDispatchToProps - данные пользователя на которого кликнули и массив заблокированных пользователей из state
      }
    render () {
        const {
            content = {} //данные которые пришли от события в Modal.js,
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
        content: state.modal.content, // данные пользователя на которого кликнули и нажали заблокировать
    }
}
const mapDispatchToProps = dispatch => {
    return{
        blockUser: (content,blockedUsers) => {
            let action = blockUserAction(); // вызываю action c type BLOCK_USER
            action.block = blockedUsers;// передаю в action заблокированных пользователей из state
            dispatch(action);// отправляю в редьюсер
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlockUser)