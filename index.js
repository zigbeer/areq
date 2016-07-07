var EventEmitter = require('events');

var AREQ_TIMEOUT = 30,  // seconds

var _pendings = {}; // { evtName: { deferred, listener, timeout, pending }, ... }

var areq = {
    emitter: null
};

areq.register = function (evt, deferred, listener) {
    var registered = false,
        alarm;  // timeout controller

    if (typeof evt !== 'string')
        throw new TypeError('evt should be a string.');

    if (typeof deferred === 'function') {
        listener = deferred;
        deferred = null;
    }

    if (areq.getRecord(evt)) {  // someone waiting same event
        registered = false;
    } else {
        alarm = createAlarm(evt);
        areq.emitter.once(evt, listener);

        _pendings[evt] = {
            listener: listener,
            deferred: deferred,
            timeout: alarm
        }

        registered = true;
    }

    return registered;
};

areq.deregister = function (evt) {
    if (typeof evt !== 'string')
        throw new TypeError('evt should be a string.');

    var rec = areq.getRecord(evt),
        emitter = areq.emitter;

    if (rec) {
        if (rec.timeout) {
            clearTimeout(rec.timeout);
            rec.timeout = null;
        }

        if (rec.deferred) {
            if (rec.deferred.isPending()) {
                rec.deferred.reject(new Error('Areq been cancelled. If this is not what you expect, please settle ' 
                                            + 'the promise state then do the deregister.'));
            }
            rec.deferred = null;
        }

        if (rec.listener) {
            emitter.removeListener(evt, rec.listener);
            rec.listener = null;
        }

        areq.removeRecord(evt);
    }
};

areq.getRecord = function (evt) {
    return _pendings[evt];
};

areq.removeRecord = function (evt) {
    _pendings[evt] = null;
    delete _pendings[evt];
};

areq.isEventPending = function (evt) {
    return !!_pendings[evt];
};

areq.setAreqTimeout = function (time) {
    AREQ_TIMEOUT = time;
};

/*************************************************************************************************/
/*** Private Functions                                                                         ***/
/*************************************************************************************************/
function createAlarm(evt) {
    var alarm;

    alarm = setTimeout(function () {
        var rec = areq.getRecord(evt),
            deferred = rec ? rec.deferred : null;

        if (rec) {
            // state should be settled
            if (deferred)
                deferred.reject(new Error('Request timeout.'));
            else if (typeof rec.listener === 'function')
                rec.listener(new Error('Request timeout.'));

            areq.deregister(evt);
        }
    }, AREQ_TIMEOUT);

    return alarm;
}

/*************************************************************************************************/
/*** Module Exports                                                                            ***/
/*************************************************************************************************/
module.exports = function (emitter) {
    if (!emitter instanceof EventEmitter)
        throw new TypeError('Input emitter should be an EventEmitter.');

    areq.emitter = emitter;
    return areq;
};
