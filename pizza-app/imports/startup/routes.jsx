import React from 'react';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import  App from '../ui/App.jsx';

import Group from '../ui/Group.jsx';
import Users from '../ui/Users.jsx';
import CreateEvent from '../ui/CreateEvent.jsx';

FlowRouter.route('/',{
    name:'home',
    action() {
        mount(App, {})
    }
});

FlowRouter.route('/groups/get/:id', {
    name: 'singleGroup',
    action(params) {
        mount(Group, {groupId: params.id})
    }
});

FlowRouter.route('/users', {
    name: 'users',
    action() {
        mount(Users)
    }
});

FlowRouter.route('/events/create', {
    name: 'createEvent',
    action(){
        mount(CreateEvent)
    }
})

