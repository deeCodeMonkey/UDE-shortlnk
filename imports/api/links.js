import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if(Meteor.isServer){
    Meteor.publish('linksPub', function () {
        return Links.find({ userId: this.userId });
    });
}

//resource.action
Meteor.methods({

    'links.insert'(url) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        //validate URL
            new SimpleSchema({
                url: {
                    type: String,
                    regEx: SimpleSchema.RegEx.Url,
                    label: 'Your link'
                }
            }).validate({ url });

            Links.insert({
            //Meteor auto create _id UNLESS _id is set by developer
            _id: shortid.generate(),
            url,
            userId: this.userId
        });
    }


});