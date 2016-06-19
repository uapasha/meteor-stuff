import {Groups } from '../imports/api/groups.js';
import {Items} from '../imports/api/items.js';

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
            {name: 'margarita', price: 100}, {name: 'napolitano', price: 200},
            {name: 'quatro formaggi', price: 150}, {name: 'gavaian', price: 200},
            {name: 'seafood pizza', price: 250}, {name: 'Papperoni', price: 170}
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