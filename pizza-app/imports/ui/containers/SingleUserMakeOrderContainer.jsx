import React, { Component, PropTypes} from 'react';
import {Groups} from '../../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor'
import {SingleUserMakeOrder} from '../MainComponents/SingleUserMakeOrder.jsx';


export default SingleUserMakeOrderContainer = createContainer(() => {
    const groupId = FlowRouter.getParam("groupId");
    const eventId = FlowRouter.getParam('eventId');
    
    Meteor.subscribe('groupForEvent', groupId);
    
    const group = Groups.find({'_id':groupId}).fetch()[0];
    let groupNow = !!group ? group : {};
    
    return {
        groupId: groupId,
        eventId: eventId,
        items: !!groupNow.items ? groupNow.items : []
    };
}, SingleUserMakeOrder);