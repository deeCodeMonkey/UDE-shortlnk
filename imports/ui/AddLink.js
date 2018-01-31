import React, { Component } from 'react';

export default class AddLink extends Component {

    state = {
        url: ''
    }

    onSubmit = (e) => {
        //no longer getting input data from the DOM, it is maintained in state as "controlled input"
        //const url = e.target.url.value.trim();
        const { url } = this.state;
        e.preventDefault();
        if (url) {
            Meteor.call('links.insert', url, (err, res) => {
                if (!err) {
                    this.setState({url: ''});
                }
            });
            //Links.insert({ url, userId: Meteor.userId() });
            //e.target.url.value = '';
        }
    }

    onChange = (e) => {
        this.setState({
            url: e.target.value.trim()
        })
    }

    render() {
        return (
            <div>
                <p>Add Link</p>
                <form onSubmit={this.onSubmit}>
                    {/*name="url" no longer using uncontrolled input*/}
                    <input
                        type="text"
                        placeholder="URL"
                        value={this.state.url}
                        onChange={this.onChange}
                    />
                    <button>Add Link</button>
                </form>
            </div>
        );
    }
}


