import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class LogIn extends Component {

    state = {
        error: ''
    }

    onSubmit = (e) => {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;

        Meteor.loginWithPassword({ email }, password, (err) => {
            if (err) {
                this.setState({ error: 'Unable to login. Check email or password.' });
            } else {
                this.setState({ error: '' });
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Short Link</h1>

                {this.state.error ? <p>{this.state.error}</p> : undefined}

                <form onSubmit={this.onSubmit} noValidate>
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Password" />
                    <button>Log In</button>
                </form>

                <Link to="/signup">Need to create an account?</Link>
            </div>
            );
    }
}