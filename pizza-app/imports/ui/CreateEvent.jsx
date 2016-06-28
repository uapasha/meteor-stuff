import React, { Component, PropTypes} from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor'
import ReactDOM from 'react-dom';
import {EventItem} from './EventItem.jsx';

export class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // renderItems(){
    //     if (this.props.items.length > 0) {
    //         return <div class="eventMenu">
    //             <div><h1>Selected Items</h1></div>
    //             {this.props.items.map((item) => {
    //                     return <EventItem key={'itemNode_' + item._id}
    //                                       item={item}
    //                                       totalAmount={this.totalAmount.bind(this)}/>
    //                 }
    //             )}
    //         </div>
    //     } else {
    //         return <div>No items selected</div>
    //     }
    // }

    getDefaultDate(){
            const now = new Date();
            const day = ("0" + now.getDate()).slice(-2);
            const month = ("0" + (now.getMonth() + 1)).slice(-2);
            return now.getFullYear()+"-"+(month)+"-"+(day) ;
    }
    getDefaultTime(){
        const time = (new Date()).toTimeString().split(' ')[0];
        const hours = time.substring(0,3);
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
        // const eventItems = [];
        // this.props.items.map((item) => {
        //     eventItems.push({id: item._id,
        //                         name: item.name,
        //                         price: item.price,
        //                         amount: this.state[item._id] ? this.state[item._id] : 0})
        // });

        Meteor.call('events.create', eventDateTime, this.props.group.name, this.props.group._id,);
        // console.log(Events.find().fetch());
        // if (Events.find().fetch()) {
        FlowRouter.go('singleGroup', {id: this.props.group._id});
        // }


    }
    // getTotalSum() {
    //     if (this.state) {
    //         return Object.keys(this.state).reduce((sum, id)=> {
    //             let itemPrice = 0;
    //             this.props.items.forEach((item) => {
    //
    //                 if (item._id == id){
    //                     itemPrice = item.price;
    //                 }
    //             });
    //             return sum + parseInt(this.state[id], 10) * itemPrice
    //         }, 0)
    //
    //     } else {
    //         return 0
    //     }
    // }
    render() {
        return <div>
            <h1>Create Event</h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                    <label for="selectDate">Select Event Date
                        <input ref="eventDate" type="date" defaultValue={this.getDefaultDate()} name="selectDate"/>
                    </label>
                    <label for="selectTime">Select Event Time
                        <input ref="eventTime" type="time" defaultValue={this.getDefaultTime()} name="selectDate"
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