/**
 * Created by spatialx on 9/6/15.
 */
var express = require('express');
var _ = require('underscore');
var passport = require('passport');
var router = express.Router();
var fs = require('fs');

var pageObject = function(view){
    var page = view+'.ejs';
    if(view!='SHELL'.toLowerCase() && view!='MESH'.toLowerCase()){
        page = 'templates/'+view+'.ejs';
    }
    return page;
}

router.get('/',function(req,res){
    res.redirect('/apps/quantum/shell');
});

router.get('/:view',function(req,res){
    var view = req.params.view;
    res.render(pageObject(view),{title:'Center Mesh !@!'});
});

module.exports = router;