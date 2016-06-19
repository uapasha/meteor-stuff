import  React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import {Groups} from '../api/groups.js'

import Group from './Group.jsx';

class App extends Component {
    renderGroups() {
        return this.props.groups.map((group) => (
            <Group
                key={group._id}
                // name={group.name}
                // imgSource={group.img}
                // items={group.items}
                // people={group.people}
                group={group}
            />
        ));
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

                <ul>
                    {this.renderGroups()}
                </ul>
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