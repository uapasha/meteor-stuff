import React, { Component, PropTypes} from 'react';
import MenuItems from './MenuItems.jsx';
import {Groups} from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor'
import ReactDOM from 'react-dom';
import Users from './Users.jsx'


class Group extends Component {
    deleteGroup(){
        Groups.remove({_id:this.props.group._id});
        FlowRouter.go('home');
    }

    getUsers(){
        return <Users users={this.props.group.users}/>
    }

    addUser(){
        {
            return (
                <fieldset>
                    <legend>Add User To Group</legend>
                    <form
                        onSubmit={this.handleNewUser.bind(this)}>
                        <select
                            name="user"
                            ref="selectedUser">
                            {this.props.users.map((user) => {
                                    return <option key={user._id} value={user._id}>{user.profile.name}</option>
                                }
                            )}
                        </select>
                        <input type="submit" value="Add user"/>
                    </form>

                </fieldset>
            )
        }

    }

    handleNewUser(event){
        event.preventDefault();
        const newUserId = ReactDOM.findDOMNode(this.refs.selectedUser).value.trim();
        const newUser = Meteor.users.findOne({_id:newUserId});
        console.log(newUser);
        Groups.update({_id:this.props.group._id}, {$addToSet: {users: newUser}});

    }


    render(){
        return (

            <div className="group-information">
                <li>{this.props.group.name}</li>
                    <MenuItems groupItems={this.props.group.items} currentGroupId={this.props.group._id}/>
                <img src={this.props.group.img} alt={this.props.group.name + ' logo'}/>
                {this.getUsers()}
                {this.addUser()}
                <button className="deleteGroup" onClick={this.deleteGroup.bind(this)}>
                    Remove Group
                    &times;
                </button>
                <a href={FlowRouter.path('createEvent', {id:FlowRouter.getParam("id")})}>Create Event</a>

            </div>
        );
    }
}

Group.propTypes = {
    group: PropTypes.object,
    users: PropTypes.array
};

export default createContainer(() => {
    const id = FlowRouter.getParam("id");
    console.log('!!!   id: ' + id);
    const group = Groups.find({'_id':id}).fetch()[0];
    const users = Meteor.users.find().fetch();

    return {
        group: !!group ? group : {},
        users: !!users ? users : []
    };
}, Group);