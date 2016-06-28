import React, { Component, PropTypes} from 'react';
import GroupItems from './GroupItems.jsx';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor'
import ReactDOM from 'react-dom';
import Users from './Users.jsx'
import {Event} from './Event.jsx'
import {Events} from '../api/events.js';


class Group extends Component {
    deleteGroup(){
        Meteor.call('groups.deleteGroup', this.props.group._id);
        FlowRouter.go('home');
    }

    getUsers(){
        return <Users users={this.props.group.users} 
                      creatorId={this.props.group.creatorId} 
                      groupId = {this.props.group._id}/>
    }

    renderEvents(){
        if (this.props.events[0]){
            return <div class="eventsList">
                <h1>Events: </h1>
                {this.props.events.map((event) => {
                    return <Event event={event} key={'event_' + event._id}/>
                })}
            </div>
            } else {
                return<div> <p>There are no events yet</p> </div>
                }
            }

    addUser(){
    return<fieldset>
            <legend>Add User To Group</legend>
            <form
                onSubmit={this.handleNewUser.bind(this)}>
                <select
                    name="user"
                    ref="selectedUser">
                    {this.props.users.map((user) => {
                            return <option key={user._id} value={user._id}>{user.profile ? user.profile.name : user.username}</option>
                        }
                    )}
                </select>
                <input type="submit" value="Add user"/>
            </form>

        </fieldset>
    }

    handleNewUser(event){
        event.preventDefault();
        const newUserId = ReactDOM.findDOMNode(this.refs.selectedUser).value.trim();
        let newUser = Meteor.users.findOne({_id:newUserId});
        newUser = {id: newUser._id, name: newUser.username ? newUser.username : newUser.profile.name};
        Meteor.call('groups.addUser', this.props.group._id, newUser);
    }

    renderRemoveButton(){
        if (this.props.group.creatorId) {
            if (this.props.group.creatorId == Meteor.userId()){
                return<button className="deleteGroup" onClick={this.deleteGroup.bind(this)}>
                    Remove Group
                    &times;
                </button>
            } else return <p>Only group creator can remove group</p>
        } else {
            return<button className="deleteGroup" onClick={this.deleteGroup.bind(this)}>
                Remove Group
                &times;
            </button>
        }
    }

    goCreateEvent(){
        FlowRouter.go('createEvent', {id:FlowRouter.getParam("id")});
    }
    renderCreateEventButton(){
        if (this.props.group.creatorId) {
            if (this.props.group.creatorId == Meteor.userId()) {
                return <button onClick={this.goCreateEvent.bind(this)}>
                    Create Event
                </button>
            } else return <p>Only group creator can create Event</p>
        } else return <button onClick={this.goCreateEvent.bind(this)}>
            Create Event
        </button>
    }

    render(){
        return (

            <div className="group-information">
                <h1>Group that is called: {this.props.group.name}</h1>
                <img src={this.props.group.img} alt={this.props.group.name + ' logo'}/>
                <hr/>
                <GroupItems groupItems={this.props.group.items} currentGroupId={this.props.group._id}/>
                <hr/>
                <h1>Users:</h1>
                {this.getUsers()}
                {this.addUser()}

                <hr/>
                {this.renderEvents()}
                {this.renderCreateEventButton()}

                <hr/>
                {this.renderRemoveButton()}
                <button onClick={()=>FlowRouter.go('home')}>Go home</button>
            </div>
        );
    }
}

Group.propTypes = {
    group: PropTypes.object,
    users: PropTypes.array,
    events: PropTypes.array
};

export default createContainer(() => {
    const id = FlowRouter.getParam("id");
    Meteor.subscribe('groups');
    Meteor.subscribe('users');
    Meteor.subscribe('events', id);
    const group = Groups.find({'_id':id}).fetch()[0];
    if ( group && group.users){
        var userIds = group.users.map((user) => {
            return user.id
        });
    } else {
        var userIds = [];
    }
    const users = Meteor.users.find({_id:{$nin: userIds}}).fetch();

    return {
        group: !!group ? group : {},
        users: !!users ? users : [],
        events: !!group ? Events.find({'group._id':group._id}).fetch() : []
    };
}, Group);