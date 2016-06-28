import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Items} from '../api/items.js';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import {PizzaItem} from './PizzaItem.jsx'
import {Meteor} from 'meteor/meteor'

export default class Users extends Component {
    removeUser(event, userId){
        console.log(userId);
        Meteor.call('groups.removeUser', userId, this.props.groupId);
    }
    
    render() {
        if (this.props.users && this.props.users.length > 0) {
            return <div className='ItemsBox'>
                {this.props.users.map((user)=> {
                    return <div key={'main' + user.id}>
                            <p>{user.name}</p>
                        {this.props.creatorId == Meteor.userId() ?
                            <button onClick={this.removeUser.bind(this, event, user.id)}>Remove User</button> :
                            ''}
                        </div>
                    }
                )}

            </div>
        } else{
            return <div>
                <p>...No users available...</p>
            </div>
        }
    }

}
