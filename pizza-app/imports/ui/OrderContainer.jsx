import React, { Component, PropTypes} from 'react';
import {Events} from '../api/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor'
import {Order} from './Order.jsx';

//used because wanted to get data through container, but
// turns out the first subscription is only one that count
export default OrderContainer = createContainer(({params}) => {
    let {orders} = params;
    //Meteor.subscribe('events.singleOrder', eventId);
    var userOrder = [];
    let totalSum = 0;
    orders.forEach((order) => {
        if (order.user_id == Meteor.userId()){
            userOrder.splice(0, userOrder.length);
            userOrder = order.order;
            totalSum = order.total_sum;
        }
    }
    );
    // console.log(userOrder);
    //let orderNow = !! order ? order : {};
    return {
        order: userOrder,
        totalSum: totalSum
    };
}, Order);