import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check'


export const Items = new Mongo.Collection('items');

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
    }
});