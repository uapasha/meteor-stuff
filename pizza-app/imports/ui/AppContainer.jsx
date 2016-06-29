import { createContainer } from 'meteor/react-meteor-data';
import {Events} from '../api/events.js';
import {Groups} from '../api/groups.js';
import {App} from './App.jsx'
import {Meteor} from 'meteor/meteor';

export default AppContainer = createContainer(() => {
    Meteor.subscribe('groupsForUser');
    Meteor.subscribe('eventsForUser');
    let groups = Groups.find({}).fetch();
    let events = Events.find({}).fetch();
    return {
        groups: groups ? groups : [],
        events: events ? events : [],
        currentUser: Meteor.user()
    };
}, App);