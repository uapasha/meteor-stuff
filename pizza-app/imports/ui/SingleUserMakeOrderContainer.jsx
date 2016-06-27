import React, { Component, PropTypes} from 'react';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor'
import {SingleUserMakeOrder} from './SingleUserMakeOrder.jsx';


export default SingleUserMakeOrderContainer = createContainer(() => {
    const id = FlowRouter.getParam("groupId");
    console.log(id);
    Meteor.subscribe('groupForEvent', id);
    const group = Groups.find({'_id':id}).fetch()[0];
    console.log(group);
    let groupNow = !!group ? group : {};
    return {
        group: groupNow,
        items: !!groupNow.items ? groupNow.items : []
    };
}, SingleUserMakeOrder);