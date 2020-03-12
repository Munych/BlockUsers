import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { showModalAction } from './redux/actions'

class Users extends React.Component {
    state = {
        columns: [
            {
                title: 'Ид юзера',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'Имя пользователя',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'email',
                dataIndex: 'email',
                key: 'email'
            }
        ],
        data: []
    }

    onClick = (e, record) => {
        this.props.triggerModal(record)
        console.log(this.props.content)
    }
    async componentDidMount() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const users = await response.json();
        console.log(users);
        this.setState(() => {
            return {
                data: users
            }
        });
    }

    render() {
        const {
            columns,
            data,
        } = this.state;

        return <div>
            <Table onRow={(record, rowIndex) => {
                return {
                    onClick: event => { this.onClick(event, record) }
                };
            }}
                columns={columns} dataSource={data} />
        </div>
    }
}



const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerModal: (record) => {
            let action = showModalAction()
            action.content = record
            dispatch(action)
        }
    }
}

const ConnectedUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(Users)
export default ConnectedUsers
