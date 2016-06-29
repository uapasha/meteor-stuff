import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Items} from '../../api/items.js';

import {PizzaItem} from './PizzaItem.jsx'
import {Meteor} from 'meteor/meteor';

export class GroupItems extends Component {

    deleteItem(event){
        Meteor.call('groups.deleteItem', this.props.currentGroupId, event.target.name);
    }

    addItem(event){
        event.preventDefault();
        
        const newPizzaItemId = ReactDOM.findDOMNode(this.refs.selectedPizza).value.trim();
        const newItem = Items.findOne({_id:newPizzaItemId});
        
        Meteor.call('groups.addItem', this.props.currentGroupId, newItem);
    }
    //// render functions ////
    renderAddNewItem(){
        // render existing items in form of options
        return <fieldset>
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
    }
    renderItems(){
        return this.props.groupItems.map((item)=> {
                if (this.props.loading){
                    return <p key={item._id}>The items are loading</p>
                } else {
                    return <div className='group-individual-item' key={item._id}>
                        <PizzaItem item={item}/>
                        <button className="delete" 
                                onClick={this.deleteItem.bind(this)} 
                                name={item._id}>
                            Remove Item
                        </button>
                    </div>
                }
            }
        )
    }
    render() {
        if (this.props.groupItems && this.props.groupItems.length > 0) {
            return <div className='group-items-box'>
                <h1>Group Items</h1>
                {this.renderItems()}
                <div className='group-add-item'>{this.renderAddNewItem()}</div>
                <a href={FlowRouter.path('menu')}>Edit menu</a>
                <hr/>
            </div>
        } else{
            return <div className='group-items-box'>
                    <p>...No items available...</p>
                    <div className='group-add-item'>
                        {this.renderAddNewItem()}
                    </div>
                    <a href={FlowRouter.path('menu')}>Edit menu</a>
                    <hr/>
                </div>
        }
    }
}

GroupItems.propTypes = {
    items: PropTypes.array.isRequired,
    loading: PropTypes.bool
};