import React, { Component, PropTypes } from 'react';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

export class PizzaItem extends Component{
    deleteItem(){
        console.log(this.props.item._id);
        Meteor.call('groups.deleteItem', this.props.currentGroupId, this.props.item._id);
    }

    render(){
        return <div class="individualItem">
                <p>
                    {this.props.item.name}:
                    <strong>{this.props.item.price}</strong>
                </p>
                <button className="delete" onClick={this.deleteItem.bind(this)}>
                    Remove Item
                    &times;
                </button>
            </div>
    }
}