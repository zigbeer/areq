# areq  
  

[![NPM](https://nodei.co/npm/areq.png?downloads=true)](https://nodei.co/npm/areq/)  

[![Travis branch](https://img.shields.io/travis/zigbeer/areq/master.svg?maxAge=2592000)](https://travis-ci.org/zigbeer/areq)
[![npm](https://img.shields.io/npm/v/areq.svg?maxAge=2592000)](https://www.npmjs.com/package/areq)
[![npm](https://img.shields.io/npm/l/areq.svg?maxAge=2592000)](https://www.npmjs.com/package/areq)

<br />
## Table of Contents

1. [Overiew](#Overiew)  
2. [Installation](#Installation)  
3. [Usage](#Usage)
4. [APIs](#APIs)  
6. [Table of Identifiers](#Identifiers) 

<br />

<a name="Overiew"></a>  
## 1. Overview  

**areq** is a timeout controller for asynchronous requests with Promise defers (e.g., Q.defer()). It tackles the event listener registering and timeout rejection for you.  
  

<a name="Installation"></a>
## 2. Installation

> $ npm install areq --save
  

<a name="Usage"></a>
## 3. Usage

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
  
<a name="APIs"></a>
## 4. APIs

* [new Areq()](#API_Areq)
* [.register()](#API_register)
* [.resolve()](#API_resolve)
* [.reject()](#API_reject)
* [.getRecord()](#API_getRecord)
* [.isEventPending()](#API_isEventPending)

********************************************
<a name="API_Areq"></a>
### new Areq(emitter[, areqTimeout])
> Create an instance of Areq Class, which will be denoted as `areq` in this document.  

**Arguments**

* emitter (*EventEmitter*): The emitter that emits the events for your listening to resolve the asynchronous responses.  
* areqTimeout (*Number*): The default timeout in milliseconds. If elapsed time from the moment of a request sending out has reached this setting, the request will be rejected with a timeout error. If it is not given, a value of 30000 ms will be used as the default.  

**Returns:**  
  
* (_Object_) Returns an instance of Areq class.  

**Example**

```js
var Areq = require('areq');

var areq = new Areq(foo_nwk_controller);
// foo_nwk_controller is your event emitter to dispatch messages from lower layer
```
********************************************
<br />

<a name="API_register"></a>
### register(evt, deferred, listener[, time])
> Register an unique event to listen for the specific response coming from the emitter.  

**Arguments**

* evt (*String*): The unique event according to the specific response.  
* deferred (*Object*): The defer object used in your method.  
* listener (*Function*): The event listener. With `areq`, now you should use `areq.resolve(evt, value)` and `areq.reject(evt, err)` instead of using `deferred.resolve(value)` and `deferred.reject(err)`. `areq.resolve()` and `areq.reject()` will take care of the listener deregistering and timeout cleaning for you.  

**Returns:**  
  
* (_None_)  

**Example**

```js
var myAreqMethod  = function () {
    var deferred = Q.defer();
    var transId = my_nwk_controller.nextTransId();
    var eventToListen = 'AF:incomingMsg:' + transId;
    // event to listner maybe like this: AF:incomingMsg:172, where 172 is a unique transection id

    areq.register(eventToListen, deferred, function (result) {
        if (result !== 'what_i_want')
            areq.reject(eventToListen, new Error('Bad response.'));
        else
            areq.resolve(eventToListen, result);
    }, 10000);  // if this reponse doesn't come back wihtin 20 secs, your myAreqMethod() will be rejected with a timeout error 

    return deferred.promise.nodeify(callback);
};

// now call your myAreqMethod() somewhere in the code
// (1) with thenable style
myAreqMethod().then(function (rsp) {
    console.log(rsp);
}).fail(function (err) {
    console.log(err);
}).done();


// (2) with err-back style
myAreqMethod(function (err, rsp) {
    if (err)
        console.log(err);
    else
        console.log(rsp);
});
```
********************************************
<br />

<a name="API_resolve"></a>
### resolve(evt, value)
> Resolve the received response if the response is exactly that you need.  

**Arguments**

* evt (*String*): The unique event according to the specific response.  
* value (*Depends*): The value you'd like to resolve.  

**Returns:**  
  
* (_None_)  

<a name="API_resolve_example"></a>
**Example**

```js
var myAreqMethod  = function () {
    var deferred = Q.defer();
    var transId = my_nwk_controller.nextTransId();
    var eventToListen = 'ZDO:incomingMsg:' + transId;

    areq.register(eventToListen, deferred, function (rsp) {
        if (rsp.status !== 0 && rsp.status !== 'SUCCESS')
            areq.reject(eventToListen, new Error('Bad response.'));
        else
            areq.resolve(eventToListen, rsp);
    });  // if this reponse doesn't come back wihtin default 30 secs, myAreqMethod() will be rejected with a timeout error 

    return deferred.promise.nodeify(callback);
};

// now call your myAreqMethod() somewhere in the code
myAreqMethod(function (err, rsp) {
    if (err)
        console.log(err);
    else
        console.log(rsp);
});
```
********************************************
<br />

<a name="API_reject"></a>
### reject(evt, err)
> Reject the received response if the response is not what you need.  

**Arguments**

* evt (*String*): The unique event according to the specific response.  
* err (*Error*): The reason why you reject this response.  

**Returns:**  
  
* (_None_)  


**Example**
  
See the exmaple given with [resolve()](#API_resolve_example) method.

********************************************
<br />

<a name="API_getRecord"></a>
### getRecord(evt)
> Get record of the given event name. Returns undefined if not found.  

**Arguments**

* evt (*String*): The unique event according to the specific response.  

**Returns:**  
  
* (_Object_) The record in the registry.  


**Example**

```js
areq.getRecord('AF:incomingMsg:6:11:162');  // { deferred: xxx, listener: yyy }

areq.getRecord('No_such_event_is_waiting');  // undefined
```
********************************************
<br />

<a name="API_isEventPending"></a>
### isEventPending(evt)
> Checks if the event is pending. Usually, if you find someone is pending over there, it is suggested to change a new event to listen to. For example, get another transection id to make a new event name for your request.  

**Arguments**

* evt (*String*): The unique event according to the specific response.  

**Returns:**  
  
* (_Boolean_) Return `true` is the given event is pending, otherwise returns `false`.  


**Example**

```js
areq.isEventPending('AF:incomingMsg:6:11:161');  // true
areq.isEventPending('AF:incomingMsg:6:11:162');  // false
```
********************************************
<br />
