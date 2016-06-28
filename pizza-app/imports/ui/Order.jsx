import React, { Component, PropTypes } from 'react';

import {Meteor} from 'meteor/meteor';

export class Order extends Component{
    
    renderOrder(){
        console.log(this.props.order);
        return <div>{this.props.order.map((item) => {
            return<div key={'item_' + item._id} class="singleOrder">
                <p>{item.name}</p>
                <p>Price: {item.price}</p>
                <p>Amount: {item.amount}</p>
            </div>
        })}</div>
    }
    render (){
        return<div>
            {this.renderOrder()}
            <h1>Total Sum: {this.props.totalSum}</h1>
        </div>
    }
}

Event.propTypes = {
    totalSum: PropTypes.number,
    order: PropTypes.array,
};