import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

export class GroupSummary extends Component {
    render(){
        return<div className="group-information">
            <img src={this.props.group.img} alt={this.props.group.name + ' logo'}/>
            <p>{this.props.group.name}</p>
            <p>Group Creator: {this.props.group.creatorName}</p>
            <p><a href={FlowRouter.path('singleGroup', {id:this.props.group._id})}>See group</a></p>
        </div>
    }
}

