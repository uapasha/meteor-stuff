import  React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import {EventDays} from '../api/eventdays.js'
import {Groups} from '../api/groups.js'
class CreateEvent extends Component {

    constructor(props){
        super(props);

        this.state = {
            currentGroup: null,
            amountSelected:1
        };
    }


    selectItems(){
        return <label for="selectItems">Select Items:
            {   (()=>{if (this.state.currentGroup){
                return<div>

                        {this.state.currentGroup.items.map((item) =>
                        {   return <div>
                                <label key={'label_for' + item.id} for="pizzaAmount">
                                    Pizza: {item.name}
                                </label>
                                1<input key={'amount_' + item.id} type="range" name="pizzaAmount"
                                min="1" max="5" ref="pizzaAmount"
                                />5
                            </div>
                        })
                        }




                </div>} else {
                return <p>No Group selected</p>
            }})()
            }
        </label>
    }

    selectGroup(){
        return<label for="selectGroup">Select Group:
            <select name="selectGroup" onChange={this.handleGroupChange.bind(this)} ref="groupSelect">
                {this.props.groups.map((group) =>
                {
                    return <option
                        key={'option_group_event' + group._id}
                        value={group._id} >{group.name}
                    </option>
                })}
            </select>
        </label>
    }

    handleAmountChanged(event){
        event.preventDefault();
        this.setState({
            amountSelected:parseInt(ReactDOM.findDOMNode(this.refs.pizzaAmount).value.trim())
        })
    }
    handleGroupChange(event){
        event.preventDefault();
        const currentGroupID = ReactDOM.findDOMNode(this.refs.groupSelect).value.trim();
        const currentGroup = this.props.groups.filter((group) => group._id === currentGroupID)[0];
        this.setState(
            {currentGroup:currentGroup}
        )
    }


    handleCreateEvent(event){
        event.preventDefault();
        // EventDays.insert(newEvent);
    }
    render(){

        return <div>
                <fieldset>
                    <legend>Create new Event</legend>
                    <form>
                        <input
                            type="text"
                            required
                            placeholder="Enter Event Name"
                            ref="newEventName"/>
                        {this.selectGroup()}
                        {this.selectItems()}
                        <label for="dateSelector">Select Date:
                            <input type="date" ref="selectDate"/>
                        </label>
                        <input
                            type="submit"
                            value="Create Event"
                            onSubmit={this.handleCreateEvent.bind(this)}/>
                    </form>
                </fieldset>
            </div>
    }
}

CreateEvent.propTypes = {
    groups: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        groups: Groups.find({}).fetch(),
    };
}, CreateEvent);