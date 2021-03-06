import React, { Component, PropTypes} from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor'
import {EventItem} from '../SmallComponents/EventItem.jsx';

export class SingleUserMakeOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    updateItemTotalAmount(id, value){
        this.setState({[id]: value})
    }

    handleSubmit(event){
        event.preventDefault();

        let orderItems = [];

        this.props.items.map((item) => {
            if (this.state[item._id] > 0) {
                orderItems.push({
                    _id: item._id,
                    name: item.name,
                    price: item.price,
                    amount: this.state[item._id] ? this.state[item._id] : 0
                })
            }
        });

        const totalSum = this.getTotalSum.call(this);

        Meteor.call('events.placeOrder', this.props.eventId, orderItems, totalSum);

        FlowRouter.go('singleGroup', {id: this.props.groupId});
    }

    getTotalSum() {

        if (this.state) {
            //get through state and calculate total sum of items
            return Object.keys(this.state).reduce((sum, id)=> {
                let itemPrice = 0;
                this.props.items.forEach((item) => {

                    if (item._id == id){
                        itemPrice = item.price;
                    }
                });
                return sum + parseInt(this.state[id], 10) * itemPrice
            }, 0)

        } else {
            return 0
        }
    }

    renderItems(){
        if (this.props.items.length > 0) {
            return <div class="eventMenu">
                <div><h1>Selected Items</h1></div>
                {this.props.items.map((item) => {
                        return <EventItem key={'itemNode_' + item._id}
                                          item={item}
                                          totalAmount={this.updateItemTotalAmount.bind(this)}/>
                    }
                )}
            </div>
        } else {
            return <div>No items selected</div>
        }
    }

    render() {
        return <div>
            <h1>Choose items</h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                    {this.renderItems()}
                    <h1>Total sum is {this.getTotalSum()}</h1>
                    <input type="submit" value ='Make Order'/>
                </fieldset>
            </form>
        </div>
    }
}

SingleUserMakeOrder.propTypes = {
    groupId: PropTypes.string,
    eventId: PropTypes.string,
    items: PropTypes.array,
};