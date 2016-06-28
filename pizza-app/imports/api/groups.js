import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check'
import {Match} from 'meteor/check';

export const Groups = new Mongo.Collection('groups');


///////// Publications ///////


if (Meteor.isServer) {

    Meteor.publish('groups', function groupsPublication() {
        
        return Groups.find();
    });
    
    Meteor.publish('groupsForUser', function (){
        const CurrentUserId = this.userId;
        return Groups.find({
            users: {
                $elemMatch: {
                    id: CurrentUserId
                }
            }
        });
        
    });
    
    Meteor.publish('users', function usersPublication() {
        return Meteor.users.find({}, {_id:1, 'profile.name':1})
    });
    
    Meteor.publish('groupForEvent', function groupForEvent(groupId){
        return Groups.find({'_id':groupId})
    })
}

Meteor.methods({

    'groups.deleteItem'(groupId, itemId){
        check(groupId, String);
        check(itemId, String);

        // make user user is logged in
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Groups.update(
            {_id: groupId},
            {$pull: {items: {_id: itemId}}},
        );
    },
    'groups.addItem'(groupId, newItem){
        Groups.update({_id:groupId}, {$addToSet: {items: newItem}});
    },
    'groups.removeItemCompletely'(itemId){
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Groups.update(
            {},
            { $pull: { items: { _id: itemId }}},
            { multi: true }
        );
    },
    'groups.updateItem'(id, name, price){
        Groups.update(
            {'items._id':id},
            {$set: {'items.$.name':name, 'items.$.price':price}},
            { multi: true }
        )
    },

    'groups.deleteGroup'(groupId){
        check(groupId, String);
        const group = Groups.findOne(groupId);
        if (group.creatorId && group.creatorId !== this.userId) {
            // only group creator can delete group
            throw new Meteor.Error('not-authorized');
        }
        Groups.remove({_id:groupId});
        Meteor.call('events.removeGroupEvents', groupId);
    },

    'groups.createGroup'(groupName, imgUrl){
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        check(groupName, String);
        check(imgUrl, Match.Maybe(String));
        const userName = Meteor.user().username ? Meteor.user().username : Meteor.user().profile.name;
        Groups.insert({
            name:groupName,
            createdAt: new Date(),
            img: imgUrl,
            creatorId: Meteor.userId(),
            creatorName: userName,
            users: [{name:userName, id:Meteor.userId()}]
        });
    },

    'groups.addUser'(groupId, newUser){
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        if (!!Groups.find({_id:groupId, 'users._id':newUser.id}).fetch()[0]){
            console.log('User has already been added');
            throw new Meteor.Error('User has already been added');

        } else {
            Groups.update({_id: groupId}, {$addToSet: {users: newUser}});
        }
    }

});
