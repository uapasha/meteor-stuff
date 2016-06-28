import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check'
import {Groups} from './groups.js';

export const Events = new Mongo.Collection('events');

if (Meteor.isServer){
    Meteor.publish('events', function eventsPublication(groupId) {
        return Events.find({'group._id':groupId})
    })
}

Meteor.methods({
    'events.create'(eventDateTime, groupName, groupId, eventItems){
        check(eventDateTime, Date);
        check(groupName, String);
        check(groupId, String);
        check(eventItems, Array);
        if (! this.userId){
            throw new Meteor.Error('not-authorized');
        }
        const Creator = Groups.find({_id:groupId, creatorId:this.userId});
        if (!Creator){
            throw new Meteor.Error('Only group Creator can create Events');
        }
        const userName = Meteor.user().username ? Meteor.user().username : Meteor.user().username.profile.name;
        Events.insert({date: eventDateTime,
            status: 'new',
            group: {
                name: groupName,
                _id: groupId},
            items: eventItems,
            eventCreatorId: this.userId,
            eventCreatorName: userName,
            participants: [{name: userName, _id: this.userId}],
            refused: [],

    });
    },
    
    'events.placeOrder'(eventId, orderItems, totalSum){
        if (! this.userId){
            throw new Meteor.Error('not-authorized');
        }
        check(eventId, String);
        check(orderItems, String);
        check(totalSum, Number);
        const userName = Meteor.user().username ? Meteor.user().username : Meteor.user().username.profile.name;
        Events.update({
            _id:eventId
        }, {
            $addToSet: {
                orders: {
                    user_name: userName,
                    user_id:this.userId, 
                    order: orderItems,
                    total_sum: totalSum
                }
            }
        })
    },
    
    'events.addParticipant'(eventId){
        if (! this.userId){
            throw new Meteor.Error('not-authorized');
        }
        check(eventId, String);
        Events.update({
            _id:eventId
        }, {
            $addToSet: {
                participants: {
                    name: Meteor.user().username ? Meteor.user().username : Meteor.user().profile.name,
                    _id: this.userId
                }
            }
        });
    },
    'events.addRefused'(eventId){
        if (! this.userId){
            throw new Meteor.Error('not-authorized');
        }
        check(eventId, String);
        Events.update({
            _id:eventId
        }, {
            $addToSet: {
                refused: {
                    name: Meteor.user().username ? Meteor.user().username : Meteor.user().profile.name,
                    _id:this.userId
                }
            }
        });
    }
    
});