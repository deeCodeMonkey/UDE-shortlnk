import React, { Component } from 'react';
//import PropTypes from 'prop-types';

class LinksListItem extends Component {
    render() {
        return (
            <div>
                HELLO
            </div>
        );
    }
}

//LinkListItem.propTypes = {
//    shortUrl: PropTypes.string.isRequired
//    //shortUrl: PropTypes.string.isRequired,
//    //shortUrl: PropTypes.string.isRequired,
//    //shortUrl: PropTypes.string.isRequired
//}

//<p>{this.props.url}</p>
//    <p>{this.props.shortUrl}</p>

export default LinksListItem;

//renderLinksListItems = () => {
//    return <LinksListItem
//        //return this.state.links.map((link) => {
//        //    //return <p key={link._id}>{link.url}</p>
//        //    const shortUrl = Meteor.absoluteUrl(link._id);
//        //    //spread operator will take every key value pair of each link object and add on as prop
//        //    return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
//        //});
//    }