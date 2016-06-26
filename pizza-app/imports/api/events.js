import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check'

export const Events = new Mongo.Collection('events');

Meteor.methods({
    'events.create'(eventDateTime, groupName, groupId, eventItems){
        console.log('hello!');
        console.log(Events.find().fetch());
        Events.insert({date: eventDateTime,
            status: 'new',
            group: {
                name: groupName,
                id: groupId},
            items: eventItems});
    }
});