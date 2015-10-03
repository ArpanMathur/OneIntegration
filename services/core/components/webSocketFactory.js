/**
 * Created by spatialx on 9/26/15.
 */
var _ = require('underscore-contrib');
var express = require('express');
var prototype = require('prototype');


var Class = prototype.Class;
var User = Class.create({
    initialize:function(id,name,socket){
        this.id=id;
        this.name=name;
        this.socket = socket;
    },
    getId: function(){
        return this.id;
    },
    getName: function(){
        return this.name;
    },
    getSocket:function(){
        return this.socket;
    }
});

var webSocketFactory = (function(){
    var users = [];
    var sockCTX = this;

    var msgService = {
        sendToPeer: function(message){
            sockCTX.sendMessage(message);
        }
    }

    var wsConfigurer = {
        configureWS:function(id,socket){
            sockCTX.configureWS(id, socket);
        }
    }

    sockCTX.configureWS = function(id, socket){
        var user = new User(id,name,socket);
        users.push(user);
    }

    sockCTX.sendMessage = function(message){
        this.message = message;
    }

    return{
        msgService: function(){
            return msgService;
        },
        wsConfigurer: function(){
            return wsConfigurer;
        }
    }

})();

module.exports = webSocketFactory;


