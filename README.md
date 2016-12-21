# areq  
A timeout controller for asynchronous requests with defer.  

[![Travis branch](https://img.shields.io/travis/zigbeer/areq/master.svg?maxAge=2592000)](https://travis-ci.org/zigbeer/areq)
[![npm](https://img.shields.io/npm/v/areq.svg?maxAge=2592000)](https://www.npmjs.com/package/areq)
[![npm](https://img.shields.io/npm/l/areq.svg?maxAge=2592000)](https://www.npmjs.com/package/areq)

<br />
  
## Documentation  

Please visit the [Wiki](https://github.com/zigbeer/areq/wiki).  


## Overview  

**areq** is a timeout controller for asynchronous requests with Promise defers (e.g., Q.defer()). It tackles the event listener registering and timeout rejection for you.  
  

## Installation  

> $ npm install areq --save
  
## Usage  

```js
var Q = require('q'),
    Areq = require('areq'),
    EventEmitter = require('events');

var myEmitter = new EventEmitter(),
    areq = new Areq(myEmitter, 6000);   // timeout after 6 seconds

var fooAsyncReq = function (callback) {
    var deferred = Q.defer();

    areq.register('some_event', deferred, function (result) {
        if (result !== 'what_i_want') {
            areq.reject('some_event', new Error('Bad response.'));
        } else {
            areq.resolve('some_event', result);
        }
    });

    return deferred.promise.nodeify(callback);
};

fooAsyncReq(function (err, result) {
    if (err)
        console.log(err);
    else
        console.log(result);
});

```

## License  

Licensed under [MIT](https://github.com/zigbeer/areq/blob/master/LICENSE).
