import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {PizzaItem} from './PizzaItem.jsx'
import {Items} from '../api/items.js';

export class Menu extends Component {
    insertItem(event) {
        event.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.newItemName).value.trim();
        const price = parseInt(ReactDOM.findDOMNode(this.refs.newItemPrice).value.trim());
        Meteor.call('items.create', name, price);
        ReactDOM.findDOMNode(this.refs.newItemPrice).value = '';
        ReactDOM.findDOMNode(this.refs.newItemName).value = '';

    }

    deleteItem(event){
        const itemId = event.target.name.split('_')[1];
        console.log(itemId);
        const sure = confirm('This will delete item from all groups. Are you sure?');
        if (sure) Meteor.call('items.deleteItem', itemId);
    }

    createNewItem() {
        return <fieldset>
            <legend>Create a new menu Item</legend>
            <form onSubmit={this.insertItem.bind(this)}>
                <label for="enterName">Enter Item Name
                    <input
                        name="enterName"
                        type="text"
                        ref="newItemName"
                        required
                        placeholder="Enter new item name"/>
                </label>
                <label for="enterPrice">Enter Price
                    <input
                        type='number'
                        name="enterPrice"
                        ref="newItemPrice"
                        required
                        defaultValue="10.0"
                        max="500.0"
                        step="0.1"
                        placeholder="0.0"/>
                </label>
                <input type="submit" value="Create new menu item"/>
            </form>

        </fieldset>
    }

    renderItems(){
        if (this.props.loading){
            return <p>Items are being loaded</p>
        } else if (this.props.items.length > 0) {
            return <div className='ItemsBox'>{
                this.props.items.map((item)=> {
                    return<div key={'menuItem_' + item._id}>
                            <PizzaItem item={item}/>
                            <button
                                name={'delete_' + item._id}
                                onClick={this.deleteItem.bind(this)}>
                                    Delete item
                            </button>
                        </div>
                })
            }
            </div>
        } else return <p>No items has been created yet</p>

    }

    render() {
        return<div>
            {this.renderItems()}
            {this.createNewItem()}
        </div>
    }
}

Menu.propTypes = {
    items: PropTypes.array.isRequired
};

export default createContainer(() => {
    const itemsHandle = Meteor.subscribe('items');
    const loading = !itemsHandle.ready();
    const items = Items.find().fetch();
    const itemsExists = !loading && !!items[0];
    return {
        loading: loading,
        items: itemsExists ? items : []
    }
}, Menu)