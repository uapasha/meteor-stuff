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
        // change total amount in the parent container
        this.props.totalAmount(id, event.target.value);
    }

    render(){
        return <div class="single-event-item">
            <h2>Pizza: {this.props.item.name}</h2>
            <p>Price: {this.props.item.price}</p>

            <strong>
                0
            </strong>
                <input type="range" name="pizzaAmount"
                        min="0" max="5" defaultValue="0"
                        onChange={this.handleAmountChanged.bind(this, this.props.item._id)}/>
            <strong>
                5
            </strong>
            <p>
                Total Sum of {this.state.amount}
                {this.props.item.name}: {this.state.amount*this.props.item.price}
            </p>
        </div>
    }
}