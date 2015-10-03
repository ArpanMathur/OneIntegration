/**
 * Created by spatialx on 9/9/15.
 */
var express = require('express');
var session = require('express-session');
var async = require('async');
var jade = require('jade');
var _ = require('underscore-contrib');
var router = express.Router();
var memory = new session.MemoryStore();

router.post('/:in',function(req, res){
    var Q = new Object();
    if (req.params.in == 'session') {
        res.setHeader('Access-Control-Allow-Origin','*');
        memory.set(req.session.sessionID, req.body.quanta, function(){
            Q.messageQ = "SUCCESS"; res.json(Q);
            console.log('After Session Save Finally ... !!!');
        });

    } else if (req.params.in == 'database') {
        console.log('Inside Database Save');
    } else {
        console.log('End point is not configured!!');
    }
});

module.exports = router;
