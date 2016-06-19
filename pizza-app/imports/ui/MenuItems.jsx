import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Items} from '../api/items.js';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import {PizzaItem} from './PizzaItem.jsx'

class MenuItems extends Component {


    addNewItem(){
        return (
            <fieldset>
                <legend>Add item</legend>
                <form
                    onSubmit={this.handleSubmit.bind(this)}>
                <select
                    name="pizza"
                    ref="selectedPizza">
                    {this.props.items.map((item) => {
                            return <option value={item._id}>{item.name}</option>
                        }
                    )}
                </select>
                    <input type="submit" value="Add item"/>
                </form>

            </fieldset>
        )
    }

    handleSubmit(event){
        event.preventDefault();
        const newPizzaItemId = ReactDOM.findDOMNode(this.refs.selectedPizza).value.trim();
        const newItem = Items.findOne({_id:newPizzaItemId});
        console.log(newItem);
        Groups.update({_id:this.props.currentGroupId}, {$addToSet: {items: newItem}});

    }


    render() {
        if (this.props.groupItems.length > 0) {
            return <div className='ItemsBox'>
                {this.props.groupItems.map((item)=> {
                        return <PizzaItem item={item} currentGroupId={this.props.currentGroupId}/>
                    }
                )}

                <h1>Total:
                    {this.props.groupItems.reduce((sum, item) =>
                        (item.price + sum), 0)}
                </h1>
                <div>{this.addNewItem()}</div>

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
    items: PropTypes.array.isRequired,
};

export default createContainer(() => {
        return {
            items: Items.find().fetch(),
        }
    }, MenuItems);