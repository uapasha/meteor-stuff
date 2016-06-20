import React from 'react';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import  App from '../ui/App.jsx';
import CreateGroup from '../ui/CreateGroup.jsx'
import Group from '../ui/Group.jsx';

FlowRouter.route('/',{
    name:'home',
    action() {
        mount(App, {})
    }
});

FlowRouter.route('/groups/create', {
    action() {
        mount(CreateGroup, {})
    }
})

FlowRouter.route('/groups/get/:id', {
    name: 'singleGroup',
    action(params) {
        mount(Group, {groupId: params.id})
    }
})

