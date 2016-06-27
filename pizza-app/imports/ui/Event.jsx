import React, { Component, PropTypes } from 'react';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Events} from '../api/events.js';

export class Event extends Component{
    takePart(){
        Meteor.call('events.addParticipant', this.props.event._id);
    }
    declineEvent(){
        Meteor.call('events.addRefused', this.props.event._id);
    }
    handleChooseItems(){
        FlowRouter.go('SingleUserMakeOrder', {groupId:this.props.event.group._id,
                                            eventId:this.props.event._id})
    }
    renderButton() {
        let participantUserIds = [];
        this.props.event.participants.forEach((user) => {
            participantUserIds.push(user._id);
        });
        let refusedUserIds = [];
        this.props.event.refused.forEach((user) => {
            refusedUserIds.push(user._id);
        });
        if (refusedUserIds.indexOf(Meteor.userId()) !==-1) {
            return <p>Sorry, you had refused to participate</p>
        } else if(participantUserIds.indexOf(Meteor.userId()) === -1 ){
            return <div>
                <button onClick={this.takePart.bind(this)}>Take part</button>
                <button onClick={this.declineEvent.bind(this)}>Decline</button>
            </div>
        } else return <button onClick={this.handleChooseItems.bind(this)}>
            Choose items
        </button>
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