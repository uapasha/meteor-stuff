import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Items} from '../api/items.js';
import { createContainer } from 'meteor/react-meteor-data';
import {PizzaItem} from './PizzaItem.jsx'
import {Meteor} from 'meteor/meteor';

class MenuItems extends Component {


    addNewItem(){
        return (
            <fieldset>
                <legend>Add item</legend>
                <form
                    onSubmit={this.addItem.bind(this)}>
                <select
                    name="pizza"
                    ref="selectedPizza">
                    {this.props.items.map((item) => {
                            return <option key={item._id} value={item._id}>{item.name}</option>
                        }
                    )}
                </select>
                    <input type="submit" value="Add item"/>
                </form>

            </fieldset>
        )
    }

    createNewItem(){
        return<fieldset>
            <legend>Create new Item</legend>
                <form onSubmit={this.insertItem.bind(this)}>
                    <input
                        type="text"
                        ref="newItemName"
                        required
                        placeholder="Enter new pizza name"/>
                    <input
                        type='number'
                        ref="newItemPrice"
                        required
                        min="50.0" 
                        max="500.0"
                        step="0.01"
                        placeholder="0.0"/>
                    <input type="submit" value="Create new pizza"/>

                </form>

        </fieldset>
    }

    insertItem(event){
        event.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.newItemName).value.trim();
        const price = parseInt(ReactDOM.findDOMNode(this.refs.newItemPrice).value.trim());
        Meteor.call('items.create', name, price);
        ReactDOM.findDOMNode(this.refs.newItemPrice).value = '';
        ReactDOM.findDOMNode(this.refs.newItemName).value = '';

    }

    addItem(event){
        event.preventDefault();
        const newPizzaItemId = ReactDOM.findDOMNode(this.refs.selectedPizza).value.trim();
        const newItem = Items.findOne({_id:newPizzaItemId});
        Meteor.call('groups.addItem', this.props.currentGroupId, newItem);
    }


    render() {
        if (this.props.groupItems && this.props.groupItems.length > 0) {
            return <div className='ItemsBox'>
                {this.props.groupItems.map((item)=> {
                        return <PizzaItem key={item._id} item={item} currentGroupId={this.props.currentGroupId}/>
                    }
                )}

                <h1>Total:
                    {this.props.groupItems.reduce((sum, item) =>
                        (item.price + sum), 0)}
                </h1>
                <div>{this.addNewItem()}</div>
                {this.createNewItem()}

            </div>
        } else{
            return <div>
                    <p>...No items available...</p>
                    <div>{this.addNewItem()}</div>
                </div>
        }
    }
}

MenuItems.propTypes = {
    items: PropTypes.array.isRequired
};

export default createContainer(() => {
        return {
            items: Items.find().fetch()
        }
    }, MenuItems);