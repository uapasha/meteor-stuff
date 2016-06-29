import React, { Component, PropTypes} from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor'
import ReactDOM from 'react-dom';


export class CreateEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    getDefaultDate(){
        const now = new Date();
        const day = ("0" + now.getDate()).slice(-2);
    
        // january is 0
        let month = ("0" + (now.getMonth() + 1)).slice(-2);
        return now.getFullYear()+"-"+(month)+"-"+(day) ;
    }

    getDefaultTime(){
        const time = (new Date()).toTimeString().split(' ')[0];
        const hours = time.substring(0,3);
        
        // round minutes for greater user convenience
        const minutes = Math.ceil(parseInt(time.substring(3,5), 10)/10)*10;
        return hours + minutes;
    }

    totalAmount(id, value){
        this.setState({[id]: value})
    }

    handleSubmit(event){
        event.preventDefault();
        // parse, concatenate and create date
        const eventDate = ReactDOM.findDOMNode(this.refs.eventDate).value.trim();
        const eventTime = ReactDOM.findDOMNode(this.refs.eventTime).value.trim();

        const eventDateTime = new Date(Date.parse(eventDate + 'T' + eventTime + '+03:00'));

        Meteor.call('events.create', eventDateTime, this.props.group.name, this.props.group._id,);

        FlowRouter.go('singleGroup', {id: this.props.group._id});
    }

    render() {
        return <div class="create-event">
            <h1>Create Event</h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                    <label for="selectDate">Select Event Date
                        <input ref="eventDate" 
                               type="date" defaultValue={this.getDefaultDate()} 
                               name="selectDate"/>
                    </label>
                    <label for="selectTime">Select Event Time
                        <input ref="eventTime" 
                               type="time" 
                               defaultValue={this.getDefaultTime()} 
                               name="selectDate"
                        step ='300.0'/>
                    </label>
                    <input type="submit" value ='Create Event'/>
                </fieldset>
            </form>
            </div>
    }
}

CreateEvent.propTypes = {
    group: PropTypes.object,
    items: PropTypes.array,
};