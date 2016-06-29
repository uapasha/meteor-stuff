import  React, { Component, PropTypes } from 'react';``
import AccountsUIWrapper from '../SmallComponents/AccountsUIWrapper.jsx';

import {GroupSummary} from '../SmallComponents/GroupSummary.jsx';
import {CreateGroup} from '../SmallComponents/CreateGroup.jsx'
import {Event} from './Event.jsx'

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideEmpty: false,
            showEvents: false,
        };
    }

    eventsHandler(){
        // handles logic of rendering events components
        if (this.props.events && this.props.events.length > 0){
            // if there are any events that user created - show button
            return <section className = 'events-list'>
                <h1>Events that you created:</h1>
                <button onClick={this.toggleShowEvents.bind(this)}>
                    {this.state.showEvents ? 'Hide events' : 'Show events'}
                </button>
                {this.state.showEvents ? this.renderEvents() : ''}
                </section>
        } else return <p>If You ever create any events You'll see them here</p>
    }
    //// state change functions ////
    toggleShowEvents(){
        // changes state of showEvent when button in events section clicked
        this.setState({
            showEvents: !this.state.showEvents
        })
    }
    toggleHideEmpty(){
        // change sate of hideEmpty state property
        this.setState({
            hideEmpty: !this.state.hideEmpty,
        });
    }

    //// render functions ////
    renderEvents(){

        return this.props.events.map((event)=>{
            return <Event event={event} key={'event_' + event._id}/>
        })
    }
    renderGroups() {

        let filteredGroups = this.props.groups;

        // filter groups without items if hideEmpty activated
        if(this.state.hideEmpty){
            filteredGroups = filteredGroups.filter(group => !!group.items && group.items.length > 0);
        }

        if(filteredGroups.length === 0){
            return <p>No groups available. Try creating new one</p>
        }

        return filteredGroups.map((group) => (
            <GroupSummary key={'main' + group._id} group={group}/>
        ));
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
                        Hide groups with no items
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

//properties checker
App.propTypes = {
    groups: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
    events: PropTypes.array,
};