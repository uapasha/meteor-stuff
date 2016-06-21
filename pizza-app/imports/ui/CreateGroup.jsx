import React, { Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Items} from '../api/items.js';
import {Groups} from '../api/groups.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';

class CreateGroup extends Component {


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
    
    addNewItem() {
        return (
            <div>
                <select
                    name="pizza"
                    ref="selectedPizza">
                    {this.props.items.map((item) => {
                            return <option key={item._id} value={item._id}>{item.name}</option>
                        }
                    )}
                </select>
            </div>
        )
    }

    render(){
        return (
            <div className="container">
                <header>
                    <h1>Add new group</h1>
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
                        {this.addNewItem()}
                        <input
                            type="submit" value="Add new Group"/>

                    </form>
                </fieldset>

            </div>

        )
    }
}

CreateGroup.propTypes = {
    items: PropTypes.array,
};

export default createContainer(() => {
    return {
        items: Items.find().fetch(),
    }
}, CreateGroup);