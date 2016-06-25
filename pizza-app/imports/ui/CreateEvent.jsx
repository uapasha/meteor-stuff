import React, { Component, PropTypes} from 'react';
import MenuItems from './MenuItems.jsx';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor'
import ReactDOM from 'react-dom';
import Users from './Users.jsx'
import {EventDays} from '../api/eventdays.js'


class CreateEvent extends Component {
    // constructor(props) {
    //     super(props);
    //     if (this.props.items.length > 0) {
    //         this.props.items.map((item) => {
    //             this.state{item._id: 0}
    //         })
    //     } else {
    //         this.state.
    //     }
    // }
    renderItems(){
        if (this.props.items.length > 0) {
            return <div class="eventMenu">
                <div><h1>Selected Items</h1></div>
                {this.props.items.map((item) => {
                        return <div key={'selectItem_' + item._id}>
                            <h2>Pizza: {item.name}</h2>
                            <p>Price: {item.price}</p>
                            1<input type="range" name="pizzaAmount"
                                   min="0" max="5" defaultValue="1"
                                    key={"pizzaAmount_" + item._id}
                                   />5
                            <p>Total Sum of {item.name}: {1*item.price}</p>
                        </div>
                    }
                )}
            </div>
        } else {
            return <div>No items selected</div>
        }
    }



    // handleAmountChanged(event){
    //     event.preventDefault();
    //     console.log(event.value);
    // }
    getDefaultDate(){
            const now = new Date();
            const day = ("0" + now.getDate()).slice(-2);
            const month = ("0" + (now.getMonth() + 1)).slice(-2);
            return now.getFullYear()+"-"+(month)+"-"+(day) ;
    }
    getDefaultTime(){
        const time = (new Date()).toTimeString().split(' ')[0].substring(0,5)
        console.log(time);
        return time
    }

    handleSubmit(event){
        event.preventDefault();
        const eventDate = ReactDOM.findDOMNode(this.refs.eventDate).value.trim();
        console.log(eventDate);
    }

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
                    {this.renderItems()}
                    <input type="submit" value ='Create Event'/>
                </fieldset>
            </form>
            </div>
    }
}

CreateEvent.propTypes = {
    group: PropTypes.object,
    items: PropTypes.array
};

export default CreateEventContainer = createContainer(() => {
    const id = FlowRouter.getParam("id");
    const group = Groups.find({'_id':id}).fetch()[0];
    let groupNow = !!group ? group : {};
    return {
        group: !!group ? group : {},
        items: !!groupNow.items ? groupNow.items : []
    };
}, CreateEvent);