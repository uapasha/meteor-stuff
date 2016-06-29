import { createContainer } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Items} from '../../api/items.js';

import {GroupItems} from '../SmallComponents/GroupItems.jsx';

export default GroupItemsContainer = createContainer(() => {
    const itemsHandle = Meteor.subscribe('items');

    const loading = !itemsHandle.ready();
    const items = Items.find().fetch();

    const itemsExists = !loading && !!items[0];

    return {
        loading: loading,
        items: itemsExists ? items : []
    }
}, GroupItems);