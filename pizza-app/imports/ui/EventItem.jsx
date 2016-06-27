import React, { Component } from 'react';

export class EventItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            amount:0
        };
    }
    handleAmountChanged(id, event){
        event.preventDefault();
        this.setState({amount:event.target.value});
        this.props.totalAmount(id, event.target.value);
    }
    render(){
        return <div>
            <h2>Pizza: {this.props.item.name}</h2>
            <p>Price: {this.props.item.price}</p>
            0<input type="range" name="pizzaAmount"
                    min="0" max="5" defaultValue="0"
                    onChange={this.handleAmountChanged.bind(this, this.props.item._id)}
        />5
            <p>Total Sum of {this.state.amount} {this.props.item.name}: {this.state.amount*this.props.item.price}</p>
        </div>
    }
}