import  React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import {EventDays} from '../api/eventdays.js'
import {Groups} from '../api/groups.js'
import {CurrentOrder} from '../../client/localItems.js';

export default class CurrentOrderItems extends Component {

    render() {
        let items = CurrentOrder.find({groupId:this.props.groupId}).fetch()[0].items;
        console.log(items);
        return <div class="eventMenu">
            <div><h1>Selected Items</h1></div>
            {items.map((item) => {
                    return <div key={"order_details" + item._id}>
                        <p>Pizza: {item.name}</p>
                        <p>Quantity: {item.amount} Price: {item.price}</p>
                        <p>TotalSum: {item.amount * item.price}</p>
                    </div>
                }
            )}
        </div>
    }
}
