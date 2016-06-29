import React, { Component, PropTypes } from 'react';

import { createContainer } from 'meteor/react-meteor-data';

import {Meteor} from 'meteor/meteor'

export default class Users extends Component {
    removeUser(event, userId){

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
