import  React, { Component, PropTypes } from 'react';``
import { createContainer } from 'meteor/react-meteor-data';

import {Meteor} from 'meteor/meteor';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import {Groups} from '../api/groups.js';
import {GroupSummary} from './GroupSummary.jsx';
import {CreateGroup} from './CreateGroup.jsx'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideEmpty: false,
        };
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
    
    return {
        groups: Groups.find({}).fetch(),
        currentUser: Meteor.user()
    };
}, App);