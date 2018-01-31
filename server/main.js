import { Meteor } from 'meteor/meteor';
//to attach middleware
import { WebApp } from 'meteor/webapp';
//executes at load
import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-config';

Meteor.startup(() => {
    // code to run on server at startup

    //custom middleware
    WebApp.connectHandlers.use((req, res, next) => {
        //parse url
        const _id = req.url.slice(1);
        const link = Links.findOne({ _id });
        if (link) {
            //redirect to diff uri
            res.statusCode = 302;
            res.setHeader('location', link.url);
            res.end();
            Meteor.call('links.trackVisit', _id);
        } else {
            next();
        }

        //console.log('url===================', req.url, 'method==================', req.method, 'headers====================', req.headers, 'query====================', req.query);
        ////set http status code 404=not found
        //res.statusCode = 404;
        ////set httlp headers
        //res.setHeader('my-header', 'uhjklhere');
        ////set http body
        //res.write('<h1>HELLO</h1>');
        ////end htpp request
        //res.end();
        //next();
    });
});
