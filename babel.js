#!/usr/bin/env node

require('babel-core/register')({
    ignore: function (filename) {
        if(/(lib|target|node_modules)/g.test(filename)) {
            return true;
        } else {
            return false;
        }
    }
});

require('app/app');
