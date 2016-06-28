import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check'
import {Groups} from './groups.js';

export const Events = new Mongo.Collection('events');

if (Meteor.isServer){
    Meteor.publish('events', function eventsPublication(groupId) {
        return Events.find({'group._id':groupId})
    });
    Meteor.publish('eventsForUser', function eventsPublication() {
        return events = Events.find({eventCreatorId:this.userId});
    })
}
// if(Meteor.isServet){
//
//     Meteor.publish('events.singleOrder', function(eventId){
//         return Events.findOne({
//             _id: eventId
//         }, {
//             _id: 0,
//             orders: {
//                 $elemMatch:{user_id: this.user_id}
//             }})
//     });
// }



Meteor.methods({
    'events.create'(eventDateTime, groupName, groupId){
        check(eventDateTime, Date);
        check(groupName, String);
        check(groupId, String);
        if (! this.userId){
            throw new Meteor.Error('not-authorized');
        }
        const Creator = Groups.find({_id:groupId, creatorId:this.userId});
        if (!Creator){
            throw new Meteor.Error('Only group Creator can create Events');
        }
        const userName = Meteor.user().username ? Meteor.user().username : Meteor.user().profile.name;
        Events.insert({date: eventDateTime,
            status: 'new',
            group: {
                name: groupName,
                _id: groupId},
            eventCreatorId: this.userId,
            eventCreatorName: userName,
            participants: [],
            refused: [],
            orders: []

    });
    },
    
    'events.placeOrder'(eventId, orderItems, totalSum){
        if (! this.userId){
            throw new Meteor.Error('not-authorized');
        }
        check(eventId, String);
        check(orderItems, Array);
        check(totalSum, Number);
        const userName = Meteor.user().username ? Meteor.user().username : Meteor.user().profile.name;
        console.log(Events.find({_id:eventId}).fetch());
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
        });
        Meteor.call('events.checkEventStatus', eventId);
    },

    'events.changeEventStatus'(eventId, newStatus){
        if (! this.userId){
            throw new Meteor.Error('not-authorized');
        }
        check(eventId, String);
        check(newStatus, String);
        const Creator = Events.findOne({_id:eventId}).eventCreatorId;
        if (Creator != this.userId){
            throw new Meteor.Error('Only group Creator can change Event\'s status');
        }
        Events.update({_id: eventId},  {$set:{status: newStatus}})
    },

    'events.checkEventStatus'(eventId){
        check(eventId, String);
        // console.log(eventId);
        const event = Events.findOne({_id:eventId});
        // console.log(event);
        const numberOrders = event.orders.length;
        const numberRefused = event.refused.length;
        const numberInGroup = Groups.findOne({_id: event.group._id}).users.length;
        console.log(numberOrders, numberRefused, numberInGroup);
        if (numberOrders + numberRefused === numberInGroup){
            Events.update({_id: eventId},  {$set:{status: 'ordering'}})
        }
    },

    'events.removeOrder'(eventId){
        if (! this.userId){
            throw new Meteor.Error('not-authorized');
        }
        check(eventId, String);
        Events.update(
            {_id: eventId},
            { $pull: { orders: { user_id: this.userId }}},
            { multi: true }
        );
    },
    'events.cancelEvent'(eventId){
        if (! this.userId){
            throw new Meteor.Error('not-authorized');
        }
        check(eventId, String);
        const Creator = Events.findOne({_id:eventId}).eventCreatorId;
        if (Creator != this.userId){
            throw new Meteor.Error('Only group Creator can create Events');
        }
        Events.remove({_id:eventId});
    },

    'events.removeGroupEvents'(groupId){
        if (! this.userId){
            throw new Meteor.Error('not-authorized');
        }
        Events.remove({'group._id': groupId});
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