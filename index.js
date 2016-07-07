var EventEmitter = require('events');

function Areq(emitter, areqTimeout) {
    if (! (emitter instanceof EventEmitter))
        throw new TypeError('Input emitter should be an EventEmitter.');

    this._emitter = emitter;
    this._areqTimeout = areqTimeout || 30000;
    this._pendings = {};    // { evtName: { deferred, listener }, ... }
}


Areq.prototype.getRecord = function (evt) {
    throwIfEvtNotString(evt);
    return this._pendings[evt];
};

Areq.prototype.isEventPending = function (evt) {
    throwIfEvtNotString(evt);
    return !!this._pendings[evt];
};

Areq.prototype.register = function (evt, deferred, listener, time) {
    var registered = false,
        areqTimeout = time || this._areqTimeout,
        alarm;  // timeout controller

    if (typeof listener !== 'function')
        throw new TypeError('listener should be a function.');

    if (this.getRecord(evt)) {  // someone waiting same event, throw if evt is not a string
        registered = false;
    } else {
        if (!deferred.hasOwnProperty('promise'))
            throw new TypeError('deferred should be a deferred object of Promise.');

        deferred.promise.timeout(areqTimeout).fail(function(err) {
            deferred.reject(err);
        }).done();

        this._emitter.once(evt, listener);

        this._pendings[evt] = {
            listener: listener,
            deferred: deferred
        }

        registered = true;
    }

    return registered;
};

Areq.prototype.deregister = function (evt) {
    var rec = this.getRecord(evt),
        emitter = this._emitter;

    if (rec) {
        if (rec.deferred)
            rec.deferred = null;

        if (rec.listener) {
            emitter.removeListener(evt, rec.listener);
            rec.listener = null;
        }

        this._pendings[evt] = null;
        delete this._pendings[evt];
    }
};

Areq.prototype.resolve = function (evt, value) {
    var rec = this.getRecord(evt),
        deferred = rec ? rec.deferred : null;

    if (deferred && deferred.promise.isPending())
        deferred.resolve(value);

    this.deregister(evt);
};

Areq.prototype.reject = function (evt, err) {
    var rec = this.getRecord(evt),
        deferred = rec ? rec.deferred : null;

    if (deferred && deferred.promise.isPending())
        deferred.reject(err);

    this.deregister(evt);
};

function throwIfEvtNotString (evt) {
    if (typeof evt !== 'string')
        throw new TypeError('evt should be a string.');
}

module.exports = Areq;
