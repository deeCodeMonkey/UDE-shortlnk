import React, { Component } from 'react';
import Modal from 'react-modal';

export default class AddLink extends Component {

    state = {
        url: '',
        isOpen: false,
        error: ''
    }

    onSubmit = (e) => {
        //no longer getting input data from the DOM, it is maintained in state as "controlled input"
        //const url = e.target.url.value.trim();
        const { url } = this.state;
        e.preventDefault();
      
            Meteor.call('links.insert', url, (err, res) => {
                if (!err) {
                    this.handleModalClose();
                } else {
                    this.setState({ error: err.reason });
                }
            });
            //Links.insert({ url, userId: Meteor.userId() });
            //e.target.url.value = '';
        
    }

    onChange = (e) => {
        this.setState({
            url: e.target.value.trim()
        })
    }

    handleModalClose = () => {
        this.setState({ isOpen: false, url: '', error: '' });
    }

    render() {
        return (
            <div>
                <button className="button" onClick={() => this.setState({ isOpen: true })}>+ Add Link</button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Add Link"
                    onAfterOpen={() => this.refs.url.focus()}
                    //when clicking on background behind modal
                    onRequestClose={this.handleModalClose}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                >
                    <h1>Add Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit} className="boxed-view__form">
                        {/*name="url" no longer using uncontrolled input*/}
                        <input
                            type="text"
                            ref="url"
                            placeholder="URL"
                            value={this.state.url}
                            onChange={this.onChange}
                        />
                        <button className="button">Add Link</button>
                        {/*type=button so that it is not responsiblt for submitting the form*/}
                        <button type="button" className="button button--secondary" onClick={this.handleModalClose}>Cancel</button>
                    </form>
                </Modal>
            </div>
        );
    }
}


