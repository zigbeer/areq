# areq
A timeout controller for asynchronous requests  

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

**areq** is a timeout controller for asynchronous requests with Promise defers (e.g., Q.defer()).  
  
<a name="Installation"></a>
## 2. Installation

> $ npm install areq --save
  

<a name="Usage"></a>
## 3. Usage

**areq** [TBD].  

Here is a quick example.  

```js
var Q = require('q'),
    Areq = require('areq'),
    EventEmitter = require('events');

var myEmitter = Object.create(new EventEmitter()),
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
> TBD.

**Arguments**

* emitter (*EventEmitter*): TBD

**Returns:**  
  
* (_Object_) Returns an instance of Areq class.


**Example**

```js

```
********************************************
<br />

<a name="API_register"></a>
### register(evt, deferred, listener[, time])
> TBD.

**Arguments**

* evt (*String*): TBD

**Returns:**  
  
* (_Object_) Returns .


**Example**

```js

```
********************************************
<br />

<a name="API_resolve"></a>
### resolve(evt, value)
> TBD.

**Arguments**

* evt (*String*): TBD

**Returns:**  
  
* (_Object_) Returns .


**Example**

```js

```
********************************************
<br />

<a name="API_reject"></a>
### reject(evt, err)
> TBD.

**Arguments**

* evt (*String*): TBD

**Returns:**  
  
* (_Object_) Returns .


**Example**

```js

```
********************************************
<br />

<a name="API_getRecord"></a>
### getRecord(evt)
> TBD.

**Arguments**

* evt (*String*): TBD

**Returns:**  
  
* (_Object_) Returns .


**Example**

```js

```
********************************************
<br />

<a name="API_isEventPending"></a>
### isEventPending(evt)
> TBD.

**Arguments**

* evt (*String*): TBD

**Returns:**  
  
* (_Object_) Returns .


**Example**

```js

```
********************************************
<br />
