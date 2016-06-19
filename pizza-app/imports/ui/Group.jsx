import React, { Component, PropTypes} from 'react';
import MenuItems from './MenuItems.jsx'


export default class Group extends Component {



    render(){
        return (
            <div className="group-information">
                <li>{this.props.group.name}</li>
                    <MenuItems groupItems={this.props.group.items} currentGroupId={this.props.group._id}/>
                <img src={this.props.group.img} alt={this.props.group.name + ' logo'}/>
            </div>
        );
    }
}

Group.propTypes = {
    group: PropTypes.object.isRequired,
};