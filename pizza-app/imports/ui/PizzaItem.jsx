import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import {EditItem} from './EditItem.jsx'

export class PizzaItem extends Component{
    constructor(props){
        super(props);
        this.state ={
            editing: false,
        }
    }
    editItem(){
        this.setState({
            editing: !this.state.editing,
        })
    }
    renderItemChanging(){
        if (this.state.editing){
            return <EditItem item={this.props.item}/>
        }
    }
    render(){
        return <div class="individualItem">
                <p>
                    {this.props.item.name}:
                    <strong>{this.props.item.price}</strong>
                </p>
                {this.renderItemChanging()}
                <button 
                    onClick={this.editItem.bind(this)}>
                        {!this.state.editing ? 'Edit item' : 'Hide editors fields'}
                </button>
            </div>
    }
}