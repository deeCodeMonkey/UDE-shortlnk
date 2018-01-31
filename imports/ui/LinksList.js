import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { Links } from '../api/links';
import LinkListItem from './LinkListItem';

export default class LinksList extends Component {

    state = {
        links: []
    }

    componentDidMount() {
        this.linksTracker = Tracker.autorun(() => {

            Meteor.subscribe('linksPub');

            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({ links });
        });

    }

    componentWillUnmount() {
        this.linksTracker.stop();
    }

    renderLinksListItems = () => {
        return this.state.links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinkListItem key={link._id} shortUrl={shortUrl} {...link} />
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