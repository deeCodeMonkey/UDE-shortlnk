import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//not a React module but can use
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinkListItem extends Component {

    state = {
        copied: false
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);
        this.clipboard.on('success', () => {
            this.setState({ copied: true });
            setTimeout(() => {
                this.setState({ copied: false });
            }, 1000);
        }).on('error', () => {
            this.setState({ copied: false });
        });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    renderStats = () => {
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let vistedMessage = null;
        if (typeof this.props.lastVisitedAt === 'number') {
            vistedMessage = `(visited ${
                moment(this.props.lastVisitedAt).fromNow()
                })`;
        }

        return <p className="item__message">{this.props.visitedCount} {visitMessage} {vistedMessage} - {this.props.lastVisitedAt}</p>
    }

    render() {
        return (
            <div className="item">
                <h2>{this.props.url}</h2>
                <p className="item__message">{this.props.shortUrl}</p>
                {/*<p>{this.props.visible.toString()}</p>*/}

                {this.renderStats()}

                <a className="button button--pill button--link" href={this.props.url} target="_blank">
                    Visit
                </a>
                {/*data per Clipboad library*/}
                <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
                    { this.state.copied ? 'Copied' : 'Copy'}
                </button>
                <button className="button button--pill" onClick={() => {
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
                }}>
                    {this.props.visible ? 'Hide' : 'Unhide'}
                </button>
            </div>
        );
    }
}

LinkListItem.propTypes = {
    shortUrl: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number
}