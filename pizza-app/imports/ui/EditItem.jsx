import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

export class EditItem extends Component {

    insertItem(event) {
        event.preventDefault();

        const name = ReactDOM.findDOMNode(this.refs.newItemName).value.trim();
        const price = parseInt(ReactDOM.findDOMNode(this.refs.newItemPrice).value.trim());

        Meteor.call('items.update', this.props.item._id, name, price);

        //clean inputs
        ReactDOM.findDOMNode(this.refs.newItemPrice).value = '';
        ReactDOM.findDOMNode(this.refs.newItemName).value = '';

    }

    render(){
        return <fieldset>
            <legend>Edit menu Item</legend>
            <form onSubmit={this.insertItem.bind(this)}>
                <label for="enterName">Enter Item Name
                    <input
                        name="enterName"
                        type="text"
                        ref="newItemName"
                        required
                        placeholder={this.props.item.name}/>
                </label>
                <label for="enterPrice">Enter Price
                    <input
                        type='number'
                        name="enterPrice"
                        ref="newItemPrice"
                        required
                        defaultValue={this.props.item.price}
                        max="500.0"
                        step="0.1"
                        placeholder="0.0"/>
                </label>
                <input type="submit" value="Change Item"/>
            </form>

        </fieldset>
    }
}