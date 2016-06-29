import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import OrderContainer from '../containers/OrderContainer.jsx';
import ReactDOM from 'react-dom';

export class Event extends Component{
    constructor(props){
        super(props);
        this.state = {
            showOrder: false
        }
    }

    //// handlers ////
    handleTakePart(){
        Meteor.call('events.addParticipant', this.props.event._id);
    }

    handleDeclineEvent(){
        Meteor.call('events.addRefused', this.props.event._id);
    }

    handleChooseItems(){
        // first time making order in this event
        FlowRouter.go('SingleUserMakeOrder', {groupId:this.props.event.group._id,
                                            eventId:this.props.event._id})
    }

    handleCancelEvent(event, eventId){
        confirm('Are you sure you want to cancel Event?') ? Meteor.call('events.cancelEvent', eventId) : ''
    }

    handleChangeStatus(){
        const newStatus = ReactDOM.findDOMNode(this.refs.changeStatus).value.trim();
        Meteor.call('events.changeEventStatus', this.props.event._id, newStatus)
    }

    // email sent is not yet implemented
    // handleEmailSent(){
    //     Meteor.call('events.sendEmailNotification', this.props.event._id);
    //      button:
    //      <button onClick={this.handleEmailSent`.bind(this)}>Send Email</button>
    // }

    handleChangeOrder(){
        let sure = confirm('This will delete your previous order. Are you sure?');
        if (sure) {
            Meteor.call('events.removeOrder', this.props.event._id);
            FlowRouter.go('SingleUserMakeOrder', {groupId:this.props.event.group._id,
                eventId:this.props.event._id})
        }
    }

    handleShowOrder(){
        this.setState({
            showOrder: !this.state.showOrder
        })
    }
    //// render functions ////
    renderOrder(){
        if (this.state.showOrder){
            return <OrderContainer params = {{orders:this.props.event.orders}}/>
        }
    }

    renderButtons() {
        const userId = Meteor.userId();

        if (!userId){
            return <div class="log-in-warning">
                <p>Log in to take part in the event</p>
            </div>
        }

        // gather all group participants
        let participantUserIds = [];
        this.props.event.participants.forEach((user) => {
            participantUserIds.push(user._id);
        });

        // gather all refused users
        let refusedUserIds = [];
        this.props.event.refused.forEach((user) => {
            refusedUserIds.push(user._id);
        });

        // gather all users who made order
        let orderedUser = [];
        this.props.event.orders.forEach((order) => {
            orderedUser.push(order.user_id)
        });

        // check your status
        if (refusedUserIds.indexOf(userId) !==-1) {
            // you refused to participate
            return <p>Sorry, you had refused to participate</p>

        } else if(participantUserIds.indexOf(userId) === -1 ){
            // you have not yet made decision of participation
            return <div>
                <button onClick={this.handleTakePart.bind(this)}>Take part</button>
                <button onClick={this.handleDeclineEvent.bind(this)}>Decline</button>
            </div>

        } else if(orderedUser.indexOf(userId) !== -1){
            // you've already ordered some stuff for the event
            return<div>
                    <button onClick={this.handleShowOrder.bind(this)}>
                        {this.state.showOrder ? 'Hide your order':'See your order'}
                    </button>
                    <button onClick={this.handleChangeOrder.bind(this)}>Change order</button>
                </div>

        }else {
            // you confirmed participation but haven't made order yet
            return <button onClick={this.handleChooseItems.bind(this)}>
                Choose items
            </button>
        }
    }

    renderCancelEventButton(){
        if(this.props.event.eventCreatorId == Meteor.userId() && this.props.event.status !== 'delivered'){
            return <button onClick={this.handleCancelEvent.bind(this, event, this.props.event._id)}>
                Cancel Event
            </button>
        }
    }

    renderStatusOptions(){
        // if you're event creator you can force event status change
        if (this.props.event.eventCreatorId == Meteor.userId()){

            return<fieldset>
                <legend>Event Status</legend>
                <p>Current status: <strong>{this.props.event.status}</strong></p>
                <label>Change status</label>
                <select ref='changeStatus'>
                    <option value="new">New</option>
                    <option value="ordering">Ordering</option>
                    <option value="delivered">Delivered/completed</option>
                </select>
                <button onClick={this.handleChangeStatus.bind(this)}>Change event Status</button>
            </fieldset>
        }
    }

    render (){
        return <div class="event-information">

            <p>Event Date: {this.props.event.date.toLocaleString('en-US')}</p>

            <p>Group: {this.props.event.group.name}</p>

            <p>Participants:</p>
            <ul>
                {this.props.event.participants.map((user) => {
                    return <li key = {'user_' + user._id}>{user.name}</li>
                })}
            </ul>
            
            {this.renderOrder()}
            <hr/>

            {this.props.event.status === 'new' ? this.renderButtons() : ''}
            {this.props.event.status === 'ordering' ? <p>Orders are completed. Delivery will be soon</p> : ''}
            {this.props.event.status === 'delivered' ? <p>Event has completed. How was the pizza??</p> : ''}
            <hr/>
            {this.renderStatusOptions()}
            {this.renderCancelEventButton()}
        </div>
    }
}