import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import OrderContainer from './OrderContainer.jsx';

export class Event extends Component{
    constructor(props){
        super(props);
        this.state = {
            showOrder: false
        }
    }
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
    changeOrder(){
        let sure = confirm('This will delete your previous order. Are you sure?');
        if (sure) {
            Meteor.call('events.removeOrder', this.props.event._id);
            FlowRouter.go('SingleUserMakeOrder', {groupId:this.props.event.group._id,
                eventId:this.props.event._id})
        }
    }
    showOrder(){
        this.setState({
            showOrder: !this.state.showOrder
        })       
    }
    renderOrder(){
        if (this.state.showOrder){
            return <OrderContainer params = {{orders:this.props.event.orders}}/>
        }
    }
    renderButtons() {
        const userId = Meteor.userId();

        let participantUserIds = [];
        this.props.event.participants.forEach((user) => {
            participantUserIds.push(user._id);
        });

        let refusedUserIds = [];
        this.props.event.refused.forEach((user) => {
            refusedUserIds.push(user._id);
        });

        let orderedUser = [];
        this.props.event.orders.forEach((order) => {
            orderedUser.push(order.user_id)
        });

        if (refusedUserIds.indexOf(userId) !==-1) {
            return <p>Sorry, you had refused to participate</p>

        } else if(participantUserIds.indexOf(userId) === -1 ){
            return <div>
                <button onClick={this.takePart.bind(this)}>Take part</button>
                <button onClick={this.declineEvent.bind(this)}>Decline</button>
            </div>

        } else if(orderedUser.indexOf(userId) !== -1){
            return<div>
                    <button onClick={this.showOrder.bind(this)}>{this.state.showOrder ? 'Hide your order':'See your order'}</button>
                    <button onClick={this.changeOrder.bind(this)}>Change order</button>
                </div>

        }else return <button onClick={this.handleChooseItems.bind(this)}>
            Choose items
        </button>
    }

    render (){
        return <div>
            <p>Event Date: {this.props.event.date.toISOString()}</p>
            <p>Group: {this.props.event.group.name}</p>
            <p>Participants:</p>
            <ul>
                {this.props.event.participants.map((user) => {
                    return <li key = {'user_' + user._id}>{user.name}</li>
                })}
            </ul>
            {this.renderOrder()}

            {this.props.event.status === 'new' ? this.renderButtons() : ''}
        </div>
    }
}