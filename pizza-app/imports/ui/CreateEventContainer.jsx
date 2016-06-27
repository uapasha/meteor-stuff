import React, { Component, PropTypes} from 'react';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor'
import {CreateEvent} from './CreateEvent.jsx';


export default CreateEventContainer = createContainer(() => {
    const id = FlowRouter.getParam("id");
    Meteor.subscribe('groupForEvent', id);
    const group = Groups.find({'_id':id}).fetch()[0];
    let groupNow = !!group ? group : {};
    return {
        group: !!group ? group : {},
        items: !!groupNow.items ? groupNow.items : []
    };
}, CreateEvent);