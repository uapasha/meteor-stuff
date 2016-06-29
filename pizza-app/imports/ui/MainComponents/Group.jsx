import React, { Component, PropTypes} from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor'
import ReactDOM from 'react-dom';

import GroupItemsContainer from '../containers/GroupItemsContainer.jsx';
import Users from '../SmallComponents/Users.jsx'
import {Event} from './Event.jsx'

export class Group extends Component {
    
    deleteGroup(){
        Meteor.call('groups.deleteGroup', this.props.group._id);
        FlowRouter.go('home');
    }

    handleNewUser(event){
        event.preventDefault();

        const newUserId = ReactDOM.findDOMNode(this.refs.selectedUser).value.trim();
        let newUser = Meteor.users.findOne({_id:newUserId});
        // handle different types of profiles
        newUser = {id: newUser._id, name: newUser.username ? newUser.username : newUser.profile.name};

        Meteor.call('groups.addUser', this.props.group._id, newUser);
    }

    goCreateEvent(){
        FlowRouter.go('createEvent', {id:FlowRouter.getParam("id")});
    }

    //// render functions ////
    renderUsers(){
        return <Users users={this.props.group.users}
                      creatorId={this.props.group.creatorId}
                      groupId = {this.props.group._id}/>
    }

    renderEvents(){
        if (this.props.events[0]){

            return <div className="events-list">
                <h1>Events: </h1>
                {this.props.events.map((event) => {
                    return <Event event={event} key={'event_' + event._id}/>
                })}
            </div>

        } else {
            return<div> <p>There are no events yet</p> </div>
            }
        }

    renderAddUser(){
        return<fieldset>
                <legend>Add User To Group</legend>
                <form
                    onSubmit={this.handleNewUser.bind(this)}>
                    <select
                        name="user"
                        ref="selectedUser">
                        {this.props.users.map((user) => {
                                return <option key={user._id}
                                               value={user._id}>{user.profile ? user.profile.name : user.username}
                                </option>
                            }
                        )}
                    </select>
                    <input type="submit" value="Add user"/>
                </form>
            </fieldset>
    }

    renderRemoveButton(){
        // check if group has creator
        if (this.props.group.creatorId) {
            // check if user is creator
            if (this.props.group.creatorId == Meteor.userId()){

                return<button className="deleteGroup" onClick={this.deleteGroup.bind(this)}>
                    Remove Group
                    &times;
                </button>

            } else return <p>Only group creator can remove group</p>

        } else {
            return<button className="deleteGroup" onClick={this.deleteGroup.bind(this)}>
                Remove Group
            </button>
        }
    }

    renderCreateEventButton(){
        if (Meteor.userId() && this.props.group.creatorId == Meteor.userId()) {

            return <button onClick={this.goCreateEvent.bind(this)}>
                Create Event
            </button>

        } else return <p>Only group creator can create Event</p>
    }

    render(){
        return <div className="group-information">

            <h1>Group that is called: {this.props.group.name}</h1>
            <img src={this.props.group.img} alt={this.props.group.name + ' logo'}/>

            <hr/>
            {Meteor.userId() ?
                <GroupItemsContainer groupItems={this.props.group.items} currentGroupId={this.props.group._id}/> :
                <div><p>Log in to see group items</p></div>}

            <hr/>
            <h1>Users:</h1>
            {Meteor.userId() ?
                this.renderUsers() :
                <div class="log-in-warning"><p>Log in to see users</p></div>}

            {Meteor.userId() ?
                this.renderAddUser() :
                <div class="log-in-warning"><p>Log in to add users</p></div>}


            <hr/>
            {this.renderEvents()}

            <hr/>
            {this.renderCreateEventButton()}

            <hr/>
            {this.renderRemoveButton()}
            <button onClick={()=>FlowRouter.go('home')}>Go home</button>
        </div>
    }
}

// props checker
Group.propTypes = {
    group: PropTypes.object,
    users: PropTypes.array,
    events: PropTypes.array
};