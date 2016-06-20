import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Items} from '../api/items.js';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import {PizzaItem} from './PizzaItem.jsx'

class Users extends Component {

}

Users.propTypes = {
    users: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        users: Meteor.users.find().fetch(),
    }
}, Users);