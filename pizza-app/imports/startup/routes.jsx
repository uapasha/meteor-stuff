import React from 'react';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import  App from '../ui/App.jsx';

import Group from '../ui/Group.jsx';
import Users from '../ui/Users.jsx';
import CreateEventContainer from '../ui/CreateEventContainer.jsx';
import Menu from '../ui/Menu.jsx';
import SingleUserMakeOrderContainer from '../ui/SingleUserMakeOrderContainer.jsx'


FlowRouter.route('/',{
    name:'home',
    action() {
        mount(App)
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

FlowRouter.route('/events/create/:id', {
    name: 'createEvent',
    action(params){
        mount(CreateEventContainer, {id:params.id})
    }
});

FlowRouter.route('/menu/edit', {
    name: 'menu',
    action(){
        mount(Menu)
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