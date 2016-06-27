import {Groups } from '../imports/api/groups.js';
import {Items} from '../imports/api/items.js';

if (Meteor.users.find().count()<2){
    let tomId = Meteor.users.insert({
        profile: { name: 'Tom Coleman' }
    });
    let sachaId = Meteor.users.insert({
        profile: { name: 'Sacha Greif' }
    });

}

let groupsData = [
    {name:'QA', img: '/Quality-Assurance.jpg', createdAt: new Date()},
    {name: 'Web-developers', img: '/web-developer.jpg', createdAt: new Date()-1000},
    {name: 'Managers', img: '/pm-workflow.png', createdAt: new Date()-5000}
];

if (Groups.find().count() === 0) {
    groupsData.forEach((group)=> {
        Groups.insert(group)
    })
}

let itemsData = [
            {_id: '0', name: 'margarita', price: 100}, {_id:'3', name: 'napolitano', price: 200},
            {_id: '1', name: 'quatro formaggi', price: 150}, {_id: '4', name: 'gavaian', price: 200},
            {_id: '2', name: 'seafood pizza', price: 250}, {_id: '5', name: 'Papperoni', price: 170}
];

if (Items.find().count() === 0) {
    itemsData.forEach((item) => {
        Items.insert(item);
    })
}

if (Groups.find({items:{$exists:true}}).count() === 0) {
    Groups.find({}).map((group)=> {
        for(let i =0; i < 3; i++) {
            let randomItem = itemsData[Math.floor(Math.random() * itemsData.length)];
            Groups.update({_id: group._id}, {$addToSet: {items: randomItem}});
        }
    })
}