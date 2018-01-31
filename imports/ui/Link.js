﻿import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Accounts } from 'meteor/accounts-base';

//import { Links } from '../api/links';
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';


//presentational component with no props
export default () => {

    return (
        <div>
            <PrivateHeader title="Your Links" />

            <LinksList />

            <AddLink />

        </div>
        );
}
