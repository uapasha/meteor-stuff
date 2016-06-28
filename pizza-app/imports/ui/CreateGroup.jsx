import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import {Meteor} from 'meteor/meteor';

export class CreateGroup extends Component {
    handleSubmit(event){
        event.preventDefault();

        const groupName = ReactDOM.findDOMNode(this.refs.textInput)
            .value
            .trim();

        let imgUrl = ReactDOM.findDOMNode(this.refs.imageUrl).value.trim();

        if (imgUrl == ''){
            imgUrl = '/default-pizza-group-image.jpg'
        }

        Meteor.call('groups.createGroup', groupName, imgUrl);

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    renderForm(){
        if (this.props.currentUser){
            return<fieldset>
                <legend>Create a new Group</legend>
                <form
                    className="add-group"
                    onSubmit={this.handleSubmit.bind(this)}>
                    <input
                        type="text"
                        ref="textInput"
                        required
                        placeholder="Enter Group Name"/>
                    <input
                        type="text"
                        ref="imageUrl"
                        placeholder="Enter logo url"/>
                    <input
                        type="submit" value="Add new Group"/>
                </form>
            </fieldset>
        } else {
            return<div class="log-in-warning"> <p>Log in to create group</p></div>
        }
    }

    render() {
        return <div>
            {this.renderForm()}
        </div>

    }
}