import React, { Component, PropTypes} from 'react';
import MenuItems from './MenuItems.jsx';
import {Groups} from '../api/groups.js';


export default class Group extends Component {
    deleteGroup(){
        Groups.remove({_id:this.props.group._id});
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