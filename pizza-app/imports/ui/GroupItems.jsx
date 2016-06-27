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

    deleteItem(event){
        //console.log(event.target.name);
        Meteor.call('groups.deleteItem', this.props.currentGroupId, event.target.name);
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
                        if (this.props.loading){
                            return <p key={item._id}>The items are loading</p>
                        } else {
                            return <div key={item._id}>
                                <PizzaItem
                                    item={item}/>
                                <button className="delete" onClick={this.deleteItem.bind(this)} name={item._id}>
                                    Remove Item
                                    &times;
                                </button>
                            </div>
                        }
                    }
                )}
                <h1>Total:
                    {this.props.groupItems.reduce((sum, item) =>
                        (item.price + sum), 0)}
                </h1>
                <div>{this.addNewItem()}</div>
                <a href={FlowRouter.path('menu')}>Edit menu</a>
            </div>
        } else{
            return <div>
                    <p>...No items available...</p>
                    <div>{this.addNewItem()}</div>
                    <a href={FlowRouter.path('menu')}>Edit menu</a>
                </div>
        }
    }
}

MenuItems.propTypes = {
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
}, MenuItems);