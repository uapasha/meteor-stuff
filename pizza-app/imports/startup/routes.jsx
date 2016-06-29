import React from 'react';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import AppContainer from '../ui/containers/AppContainer.jsx';

import GroupContainer from '../ui/containers/GroupContainer.jsx';
import Users from '../ui/SmallComponents/Users.jsx';
import CreateEventContainer from '../ui/containers/CreateEventContainer.jsx';
import MenuContainer from '../ui/containers/MenuContainer.jsx';
import SingleUserMakeOrderContainer from '../ui/containers/SingleUserMakeOrderContainer.jsx'


FlowRouter.route('/',{
    name:'home',
    action() {
        mount(AppContainer)
    }
});

FlowRouter.route('/groups/get/:id', {
    name: 'singleGroup',
    action(params) {
        mount(GroupContainer, {groupId: params.id})
    }
});

FlowRouter.route('/users', {
    name: 'users',
    action() {
        mount(Users)
    }
});

FlowRouter.route('/events/create/:id', {
    name: 'createEvent',
    action(params){
        mount(CreateEventContainer, {id:params.id})
    }
});

FlowRouter.route('/menu/edit', {
    name: 'menu',
    action(){
        mount(MenuContainer)
    }
});

FlowRouter.route('/events/:groupId/:eventId',{
    name:'SingleUserMakeOrder',
    action(params){
        mount(SingleUserMakeOrderContainer, {eventId: params.eventId, groupId:params.groupId})
    }
});

// FlowRouter.route('/event/:eventId/yourOrder', {
//     name:'yourOrder',
//     action(params){
//         mount(OrderContainer, {params: {eventId: params.eventId}})
//     }
// });