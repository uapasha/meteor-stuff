import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check'


export const Items = new Mongo.Collection('items');

if(Meteor.isServer){
    Meteor.publish('items', function itemsPublication(){
        return Items.find();
    })
}

Meteor.methods({
    'items.create'(name, price){
        check(name, String);
        check(price, Number);

        // make user user is logged in
        if (! this.userId){
            throw new Meteor.Error('not-authorized');
        }
        Items.insert({
            name:name,
            price:price});
    },
    'items.deleteItem'(itemId){
        check(itemId, String);
        if (! this.userId){
            throw new Meteor.Error('not-authorized');
        }
        Items.remove({_id:itemId});
        Meteor.call('groups.removeItemCompletely', itemId);
    }
});