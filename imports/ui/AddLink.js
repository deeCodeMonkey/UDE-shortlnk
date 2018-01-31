import React, { Component } from 'react';

export default class AddLink extends Component {

    onSubmit = (e) => {
        const url = e.target.url.value.trim();
        e.preventDefault();
        if (url) {
            Meteor.call('links.insert', url);
            //Links.insert({ url, userId: Meteor.userId() });
            e.target.url.value = '';
        }
    }

    render() {
        return (
            <div>
                <p>Add Link</p>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="url" placeholder="URL" />
                    <button>Add Link</button>
                </form>
            </div>
        );
    }
}


