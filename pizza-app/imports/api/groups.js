import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check'
import {Match} from 'meteor/check';

export const Groups = new Mongo.Collection('groups');


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
            creator: Meteor.userId(),
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
