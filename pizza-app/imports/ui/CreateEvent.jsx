import React, { Component, PropTypes} from 'react';
import MenuItems from './MenuItems.jsx';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor'
import ReactDOM from 'react-dom';
import Users from './Users.jsx'
import {EventDays} from '../api/eventdays.js'


class CreateEvent extends Component {
    renderItems(){
        if (this.props.group.items.length > 0) {
            return <div class="eventMenu">
                <div><h1>Selected Items</h1></div>
                {this.state.currentItems.map((item) => {
                        return <div key={'selectItem_' + item._id}>
                            <h2>Pizza: {item.name}</h2>
                            <p>Price: {item.price}</p>
                            1<input type="range" name="pizzaAmount"
                                   min="0" max="5" value="1" key={"pizzaAmount_" + item._id}
                                   onchange={this.handleAmountChanged.bind(this)}/>5
                            <p>TotalSum: {item.amount*item.price}</p>
                        </div>
                    }
                )}
            </div>
        } else {
            return <div>No items selected</div>
        }
    }

    handleAmountChanged(event){
        event.preventDefault();
        console.log(event.value);
    }

    render() {
        return <div>
            <h1>Create Event</h1>
        <fieldset>
            <input ref="selectDate" type="date"/>
            {this.renderItems()}
            
        </fieldset>
            </div>
    }
}

CreateEvent.propTypes = {
    group: PropTypes.object.isRequired,
};

export default CreateEventContainer = createContainer(() => {
    const id = FlowRouter.getParam("id");
    console.log(id);
    const group = Groups.find({_id:id}).fetch()[0];
    console.log(Groups.find({_id:id}).fetch()[0]);
    return {
        group: group,
    };
}, CreateEvent);