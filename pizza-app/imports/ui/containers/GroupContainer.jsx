import { createContainer } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router';

import {Events} from '../../api/events.js';
import {Groups} from '../../api/groups.js';
import {Group} from '../Group.jsx'

export default GroupContainer = createContainer(() => {
    const id = FlowRouter.getParam("id");
    
    Meteor.subscribe('groups');
    Meteor.subscribe('users');
    Meteor.subscribe('events', id);
    
    const group = Groups.find({'_id':id}).fetch()[0];
    
    // generate list of group users
    if ( group && group.users){
        var userIds = group.users.map((user) => {
            return user.id
        });
    } else {
        var userIds = [];
    }
    // get users that are not already in the group
    const users = Meteor.users.find({_id:{$nin: userIds}}).fetch();

    return {
        group: !!group ? group : {},
        users: !!users ? users : [],
        events: !!group ? Events.find({'group._id':group._id}).fetch() : []
    };
}, Group);