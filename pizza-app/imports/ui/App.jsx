import  React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import {Groups} from '../api/groups.js'

import Group from './Group.jsx';

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
            <Group
                key={group._id}
                group={group}
            />
        ));
    }

    toggleHideEmpty(){
        this.setState({
            hideEmpty: !this.state.hideEmpty,
        });
    }

    handleSubmit(event){
        event.preventDefault();

        const groupName = ReactDOM.findDOMNode(this.refs.textInput)
                                .value
                                .trim()

        Groups.insert({
            name:groupName,
            createdAt: new Date()
        });

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    render(){
        return (
            <div className="container">
                <header>
                    <h1>Pizza App</h1>
                    <label>
                    <input
                        type="checkbox"
                        readonly
                        checked={this.state.hideEmpty}
                        onClick={this.toggleHideEmpty.bind(this)}/>
                        Hide empty groups
                    </label>
                </header>

                <fieldset>
                    <legend>Create a new Group</legend>
                <form
                    className="add-group"
                    onSubmit={this.handleSubmit.bind(this)}>
                    <input
                        type="text"
                        ref="textInput"
                        placeholder="Enter Group Name"/>
                    <input
                        type="submit" value="Add new Group"/>
                </form>
                </fieldset>

                <section className="groupList">
                    {this.renderGroups()}
                </section>
            </div>

        )
    }
}

App.propTypes = {
    groups: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        groups: Groups.find({}).fetch(),
    };
}, App);