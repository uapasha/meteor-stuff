import React, { Component, PropTypes } from 'react';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import {EventDays} from '../api/events.js';

export class Event extends Component{
    render (){
        return <div>{EventDays.find({_id:this.props.eventId}).date}</div>
    }
}