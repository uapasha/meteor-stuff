import React, { Component, PropTypes } from 'react';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Events} from '../api/events.js';

export class Event extends Component{
    takePart(){
        Meteor.call('events.addParticipant', this.props.event._id);
    }
    renderButton() {
        let userIds = [];
        this.props.event.participants.forEach((user) => {
            userIds.push(user._id);
        });
        if (userIds.indexOf(Meteor.userId()) === -1) {
            return <div>
                <button onClick={this.takePart.bind(this)}>Take part</button>
                <button>Decline</button>
            </div>
        } else return <button>Choose items</button>
    }

    render (){
        return <div>
            <p>Event Date: {this.props.event.date.toISOString()}</p>
            <p>Group: {this.props.event.group.name}</p>
            <p>Food:</p>
            <ul>
            {this.props.event.items.map((item) => {
                return <li key={item.id}>{item.name}: {item.amount}</li>
            })}
            </ul>
            <p>Participants:</p>
            <ul>
                {this.props.event.participants.map((user) => {
                    return <li key = {'user_' + user._id}>{user.name}</li>
                })}
            </ul>
            {this.renderButton()}
        </div>
    }
}