import  React, { Component, PropTypes } from 'react';``
import { createContainer } from 'meteor/react-meteor-data';

import {Meteor} from 'meteor/meteor';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import {Events} from '../api/events.js';
import {Groups} from '../api/groups.js';
import {GroupSummary} from './GroupSummary.jsx';
import {CreateGroup} from './CreateGroup.jsx'
import {Event} from './Event.jsx'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideEmpty: false,
            showEvents: false,
        };
    }

    eventsHandler(){
        if (this.props.events && this.props.events.length > 0){
            return <div class = 'events-list'> <h1>Events that you created:</h1>
                <button onClick={this.showEvents.bind(this)}>
                    {this.state.showEvents ? 'Hide events' : 'Show events'}
                </button>
                {this.state.showEvents ? this.renderEvents() : ''}
                </div>
        } else return <p>If You ever create any events You'll see them here</p>
    }

    showEvents(){
        this.setState({
            showEvents: !this.state.showEvents
        })
    }
    renderEvents(){
        return this.props.events.map((event)=>{
            return <Event event={event} key={'event_' + event._id}/>
        })
    }
    renderGroups() {
        let filteredGroups = this.props.groups;
        
        if(this.state.hideEmpty){
            filteredGroups = filteredGroups.filter(group => !!group.items && group.items.length > 0);
        }

        return filteredGroups.map((group) => (
            <GroupSummary key={'main' + group._id} group={group}/>
        ));
    }

    toggleHideEmpty(){
        this.setState({
            hideEmpty: !this.state.hideEmpty,
        });
    }

    render(){
        return (
            <div className="container">
                <header>
                    <AccountsUIWrapper />
                    <label>
                    <input
                        type="checkbox"
                        readonly
                        checked={this.state.hideEmpty}
                        onClick={this.toggleHideEmpty.bind(this)}/>
                        Hide empty groups
                    </label>
                </header>
                <CreateGroup currentUser = {this.props.currentUser}/>
                <section className="groupList">
                    {this.renderGroups()}
                </section>
                <hr/>
                {this.eventsHandler()}
            </div>

        )
    }
}

App.propTypes = {
    groups: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('groupsForUser');
    Meteor.subscribe('eventsForUser');
    return {
        groups: Groups.find({}).fetch(),
        events: Events.find({}).fetch(),
        currentUser: Meteor.user()
    };
}, App);