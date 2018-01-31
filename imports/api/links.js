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
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisited: null
        });
    },
    
    'links.setVisibility'(_id, visible) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
            new SimpleSchema({
                _id: {
                    type: String,
                    min: 1
                },
                visible: {
                    type: Boolean
                }
            }).validate({ _id, visible });

            Links.update({ _id, userId: this.userId },
                {
                    $set: {
                        visible
                    }
                }
            );
        
    },

     'links.trackVisit'(_id) {
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id });

        Links.update({ _id },
            {
                $set: {
                    lastVisitedAt: new Date().getTime()
                },
                $inc: {
                    visitedCount: 1
                }
            }
        );

    }

});