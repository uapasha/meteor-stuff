import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Items} from '../api/items.js';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import {PizzaItem} from './PizzaItem.jsx'
import {Meteor} from 'meteor/meteor'

export default class Users extends Component {
    
    render() {
        if (this.props.users && this.props.users.length > 0) {
            return <div className='ItemsBox'>
                {this.props.users.map((user)=> {
                    return <div key={'main' + user._id}>
                            <p>{user.profile.name}</p>
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
