import React, { Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import {Meteor} from 'meteor/meteor'
import {Order} from '../MainComponents/Order.jsx';

//used because wanted to get data through container, but
// turns out the first subscription is only one that count
export default OrderContainer = createContainer(({params}) => {
    let {orders} = params;
    //Meteor.subscribe('events.singleOrder', eventId);

    var userOrder = [];
    let totalSum = 0;

    orders.forEach((order) => {
        if (order.user_id == Meteor.userId()){
            // empty user order
            userOrder.splice(0, userOrder.length);

            userOrder = order.order;
            totalSum = order.total_sum;
        }
    }
    );

    return {
        order: userOrder,
        totalSum: totalSum
    };
}, Order);