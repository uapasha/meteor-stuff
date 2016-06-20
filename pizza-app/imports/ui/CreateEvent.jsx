import  React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import {EventDays} from '../api/eventdays.js'
import {Groups} from '../api/groups.js'
import {CurrentOrder} from '../../client/localItems.js'
class CreateEvent extends Component {

    constructor(props){
        super(props);

        this.state = {
            currentGroup: null,
            currentItems: {},
            amountSelected:0
        };
    }

    renderItems(){
        if (this.state.currentItems && this.state.currentItems.length > 0) {
            return <div class="eventMenu">
                <div><h1>Selected Items</h1></div>
                {this.state.currentItems.map((item) => {
                        return <div>
                            <p>Pizza: {item.name}</p>
                            <p>Quantity: {item.amount} Price: {item.price}</p>
                            <p>TotalSum: {item.amount*item.price}</p>
                        </div>
                }
                )}
            </div>
        } else {
            return <div>No items selected</div>
        }
    }

    selectItems(){
        return <label for="selectItems">Select Items:
            {   (()=>{if (this.state.currentGroup){
                return<div>
                    <select name="selectItems" ref="selectItems">
                        {this.state.currentGroup.items.map((item) =>
                        {
                            return<option
                                key={'amount_range_' + item._id}
                                value={item._id}>{item.name}
                            </option>
                        })
                        }
                    </select>

                    <input type="range" name="pizzaAmount"
                           min="0" max="5" value="1" ref="pizzaAmount"
                            onchange={this.handleAmountChanged.bind(this)}/>
                    <label for="pizzaAmount">
                        Amount: {this.state.amountSelected}
                    </label>
                    <button onClick={this.handleAddButton.bind(this)}>Add item</button>
                </div>} else {
                return <p>No Group selected</p>
            }})()
            }
        </label>
    }

    selectGroup(){
        return<label for="selectGroup">Select Group:
            <select name="selectGroup" onChange={this.handleGroupChange.bind(this)} ref="groupSelect">
                {this.props.groups.map((group) =>
                {
                    return <option
                        key={'option_group_event' + group._id}
                        value={group._id} >{group.name}
                    </option>
                })}
            </select>
        </label>
    }

    handleAmountChanged(){
        this.setState({
            amountSelected:parseInt(ReactDOM.findDOMNode(this.refs.pizzaAmount).value.trim())
        })
    }
    handleGroupChange(event){
        event.preventDefault();
        const currentGroupID = ReactDOM.findDOMNode(this.refs.groupSelect).value.trim();
        const currentGroup = this.props.groups.filter((group) => group._id === currentGroupID)[0];
        this.setState(
            {currentGroup:currentGroup}
        )
    }

    handleAddButton(event){
        event.preventDefault();
        const id = ReactDOM.findDOMNode(this.refs.selectItems).value.trim();
        const item = this.state.currentGroup.items.filter((item) => item._id == id)[0];
        item.amount = this.state.amountSelected;
        const newItems = 
        this.setState({
            currentItems:newItems
        });
        console.log(this.state.currentItems);
    }

    handleCreateEvent(event){
        event.preventDefault();
    }
    render(){

        return <div>
                <fieldset>
                    <legend>Create new Event</legend>
                    <form>
                        <input
                            type="text"
                            required
                            placeholder="Enter Event Name"
                            ref="newEventName"/>
                        {this.selectGroup()}
                        {this.selectItems()}
                        <input
                            type="submit"
                            value="Create Event"
                            onSubmit={this.handleCreateEvent.bind(this)}/>
                    </form>
                </fieldset>
                {this.renderItems()}
            </div>
    }
}

CreateEvent.propTypes = {
    groups: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        groups: Groups.find({}).fetch(),
        order: CurrentOrder.find({}).fetch()
    };
}, CreateEvent);