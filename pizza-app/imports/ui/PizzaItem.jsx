import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';

export class PizzaItem extends Component{
    render(){
        return <div class="individualItem">
                <p>
                    {this.props.item.name}:
                    <strong>{this.props.item.price}</strong>
                </p>
            </div>
    }
}