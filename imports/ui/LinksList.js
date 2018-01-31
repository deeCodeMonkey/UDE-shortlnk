import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';

import { Links } from '../api/links';

export default class LinksList extends Component {

    state = {
        links: []
    }

    componentDidMount() {
        this.linksTracker = Tracker.autorun(() => {

            Meteor.subscribe('linksPub');

            const links = Links.find().fetch();
            this.setState({ links });
        });

    }

    componentWillUnmount() {
        this.linksTracker.stop();
    }

    renderLinksListItems = () => {
        return this.state.links.map((link) => {
            return <p key={link._id}>{link.url}</p>
        });
    }

    render() {
        return (
            <div>
                <p>links list</p>
                <div>{this.renderLinksListItems()}</div>
            </div>
        );
    }
}