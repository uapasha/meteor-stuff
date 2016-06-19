import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Items} from '../api/items.js';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';

export class PizzaItem extends Component{
    deleteItem(){
        console.log(this.props.currentGroupId);

        Groups.update(
            {_id:this.props.currentGroupId},
            {$pull: {items: {_id:this.props.item._id}}},
        );
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