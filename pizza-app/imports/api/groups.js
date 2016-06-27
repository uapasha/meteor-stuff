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
    Meteor.publish('users', function usersPublication() {
        return Meteor.users.find({}, {_id:1, 'profile.name':1})
    });
    
    Meteor.publish('groupForEvent', function groupForEvent(groupId){
        return Groups.find({'_id':groupId})
    })
}

Meteor.methods({

    'groups.deleteItem'(groupId, item){
        check(groupId, String);
        //check(item, String);

        // make user user is logged in
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Groups.update(
            {_id: groupId},
            {$pull: {items: {_id: item}}},
        );
    },
    'groups.addItem'(groupId, newItem){
        Groups.update({_id:groupId}, {$addToSet: {items: newItem}});
    },

    'groups.deleteGroup'(groupId){
        check(groupId, String);
        const group = Groups.findOne(groupId);
        if (group.creatorId && group.creatorId !== this.userId) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }
        Groups.remove({_id:groupId});
    },

    'groups.createGroup'(groupName, imgUrl){
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        check(groupName, String);
        check(imgUrl, Match.Maybe(String));
        Groups.insert({
            name:groupName,
            createdAt: new Date(),
            img: imgUrl,
            creatorId: Meteor.userId(),
            creatorName: Meteor.user().username
        });
    },

    'groups.addUser'(groupId, newUser){
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        if (!!Groups.find({_id:groupId, 'users._id':newUser._id}).fetch()[0]){
            console.log('User has already been added');
            throw new Meteor.Error('User has already been added');

        } else {
            Groups.update({_id: groupId}, {$addToSet: {users: newUser}});
        }
    }

});
