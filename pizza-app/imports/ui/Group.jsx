import React, { Component, PropTypes} from 'react';
import MenuItems from './MenuItems.jsx';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';


class Group extends Component {
    deleteGroup(){
        Groups.remove({_id:this.props.group._id});
        FlowRouter.go('home');
    }

    render(){
        return (
            <div className="group-information">
                <li>{this.props.group.name}</li>
                    <MenuItems groupItems={this.props.group.items} currentGroupId={this.props.group._id}/>
                <img src={this.props.group.img} alt={this.props.group.name + ' logo'}/>
                <button className="deleteGroup" onClick={this.deleteGroup.bind(this)}>
                    Remove Group
                    &times;
                </button>
            </div>
        );
    }
}

Group.propTypes = {
    group: PropTypes.object.isRequired,
};

export default createContainer(() => {
    const id = FlowRouter.getParam("id");
    return {
        group: Groups.find({'_id':id}).fetch()[0],
    };
}, Group);