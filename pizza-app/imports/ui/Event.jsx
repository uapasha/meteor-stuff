import React, { Component, PropTypes } from 'react';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import {Events} from '../api/events.js';

export class Event extends Component{
    render (){
        return <div>
            <p>Event Date: {this.props.event.date.toISOString()}</p>
            <p>Group prticipant: {this.props.event.group.name}</p>
            <ul>
            {this.props.event.items.map((item) => {
                return <li key={item.id}>{item.name}: {item.amount}</li>
            })}
            </ul>
        </div>
    }
}