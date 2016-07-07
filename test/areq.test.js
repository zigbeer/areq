var EventEmitter = require('events'),
    expect = require('chai').expect,
    Q = require('q'),
    Areq = require('../index.js');

var emitter = Object.create(new EventEmitter());
var someAreq = new Areq(emitter);

describe('APIs Arguments Check for Throwing Errors', function() {
   describe('#.Areq Constructor', function() {
        it('should be a function', function () {
            expect(Areq).to.be.a('function');
        });

        it('should throw TypeError if input emitter is not an EventEmitter', function () {
            expect(function () { return new Areq(); }).to.throw(TypeError);
            expect(function () { return new Areq(undefined); }).to.throw(TypeError);
            expect(function () { return new Areq(null); }).to.throw(TypeError);
            expect(function () { return new Areq(NaN); }).to.throw(TypeError);
            expect(function () { return new Areq(3); }).to.throw(TypeError);
            expect(function () { return new Areq('3'); }).to.throw(TypeError);
            expect(function () { return new Areq('xx'); }).to.throw(TypeError);

            expect(function () { return new Areq([]); }).to.throw(TypeError);
            expect(function () { return new Areq({}); }).to.throw(TypeError);
            expect(function () { return new Areq(true); }).to.throw(TypeError);
            expect(function () { return new Areq(new Date()); }).to.throw(TypeError);
            expect(function () { return new Areq(function () {}); }).to.throw(TypeError);
        });

        it('should not throw Error if input emitter is an EventEmitter', function () {
            expect(function () { return new Areq(emitter); }).not.to.throw(Error);
        });
   });

   describe('#.isEventPending', function() {
        it('should be a function', function () {
            expect(someAreq.isEventPending).to.be.a('function');
        });

        it('should throw TypeError if input evt is not a string', function () {
            expect(function () { return someAreq.isEventPending(); }).to.throw(TypeError);
            expect(function () { return someAreq.isEventPending(undefined); }).to.throw(TypeError);
            expect(function () { return someAreq.isEventPending(null); }).to.throw(TypeError);
            expect(function () { return someAreq.isEventPending(NaN); }).to.throw(TypeError);
            expect(function () { return someAreq.isEventPending(3); }).to.throw(TypeError);
            expect(function () { return someAreq.isEventPending([]); }).to.throw(TypeError);
            expect(function () { return someAreq.isEventPending({}); }).to.throw(TypeError);
            expect(function () { return someAreq.isEventPending(true); }).to.throw(TypeError);
            expect(function () { return someAreq.isEventPending(new Date()); }).to.throw(TypeError);
            expect(function () { return someAreq.isEventPending(function () {}); }).to.throw(TypeError);
        });

        it('should not throw Error if input evt is a string', function () {
            expect(function () { return someAreq.isEventPending('xxx'); }).not.to.throw(Error);
            expect(function () { return someAreq.isEventPending('hello'); }).not.to.throw(Error);
        });
   });

   describe('#.getRecord', function() {
        it('should be a function', function () {
            expect(someAreq.getRecord).to.be.a('function');
        });

        it('should throw TypeError if input evt is not a string', function () {
            expect(function () { return someAreq.getRecord(); }).to.throw(TypeError);
            expect(function () { return someAreq.getRecord(undefined); }).to.throw(TypeError);
            expect(function () { return someAreq.getRecord(null); }).to.throw(TypeError);
            expect(function () { return someAreq.getRecord(NaN); }).to.throw(TypeError);
            expect(function () { return someAreq.getRecord(3); }).to.throw(TypeError);
            expect(function () { return someAreq.getRecord([]); }).to.throw(TypeError);
            expect(function () { return someAreq.getRecord({}); }).to.throw(TypeError);
            expect(function () { return someAreq.getRecord(true); }).to.throw(TypeError);
            expect(function () { return someAreq.getRecord(new Date()); }).to.throw(TypeError);
            expect(function () { return someAreq.getRecord(function () {}); }).to.throw(TypeError);
        });

        it('should not throw Error if input evt is a string', function () {
            expect(function () { return someAreq.getRecord('xxx'); }).not.to.throw(Error);
            expect(function () { return someAreq.getRecord('hello'); }).not.to.throw(Error);
        });
   });

   describe('#.register', function() {
        it('should be a function', function () {
            expect(someAreq.register).to.be.a('function');
        });

        it('should throw TypeError if input evt is not a string', function () {
            var deferred = Q.defer(),
                lsn = function () {};
            expect(function () { return someAreq.register(undefined, deferred, lsn); }).to.throw(TypeError);
            expect(function () { return someAreq.register(null, deferred, lsn); }).to.throw(TypeError);
            expect(function () { return someAreq.register(NaN, deferred, lsn); }).to.throw(TypeError);
            expect(function () { return someAreq.register(3, deferred, lsn); }).to.throw(TypeError);
            expect(function () { return someAreq.register([], deferred, lsn); }).to.throw(TypeError);
            expect(function () { return someAreq.register({}, deferred, lsn); }).to.throw(TypeError);
            expect(function () { return someAreq.register(true, deferred, lsn); }).to.throw(TypeError);
            expect(function () { return someAreq.register(new Date(), deferred, lsn); }).to.throw(TypeError);
            expect(function () { return someAreq.register(function () {}, deferred, lsn); }).to.throw(TypeError);

            expect(function () { return someAreq.register(undefined, deferred, lsn, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register(null, deferred, lsn, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register(NaN, deferred, lsn, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register(3, deferred, lsn, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register([], deferred, lsn, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register({}, deferred, lsn, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register(true, deferred, lsn, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register(new Date(), deferred, lsn, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register(function () {}, deferred, lsn, 5000); }).to.throw(TypeError);
        });

        it('should not throw Error if input evt is a string', function () {
            var deferred = Q.defer(),
                lsn = function () {};
            expect(function () { return someAreq.register('xxx', deferred, lsn, 5000); }).not.to.throw(Error);
            expect(function () { return someAreq.register('hello', deferred, lsn, 5000); }).not.to.throw(Error);
            expect(function () { return someAreq.register('xxx', deferred, lsn, 5000); }).not.to.throw(Error);
            expect(function () { return someAreq.register('hello', deferred, lsn, 5000); }).not.to.throw(Error);
        });

        it('should throw TypeError if deferred is not a deferred', function () {
            var lsn = function () {};
            expect(function () { return someAreq.register('x', undefined, lsn); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', null, lsn); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', NaN, lsn); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', 3, lsn); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', [], lsn); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', {}, lsn); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', true, lsn); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', new Date(), lsn); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', function () {}, lsn); }).to.throw(TypeError);

            expect(function () { return someAreq.register('x', undefined, lsn, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', null, lsn, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', NaN, lsn, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', 3, lsn, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', [], lsn, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', {}, lsn, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', true, lsn, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', new Date(), lsn, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', function () {}, lsn, 5000); }).to.throw(TypeError);
        });
   
        it('should throw TypeError if listener is not a function', function () {
            var deferred = Q.defer();
            expect(function () { return someAreq.register('x', deferred, undefined); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', deferred, null); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', deferred, NaN); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', deferred, 3); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', deferred, []); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', deferred, {}); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', deferred, true); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', deferred, new Date()); }).to.throw(TypeError);

            expect(function () { return someAreq.register('x', deferred, undefined, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', deferred, null, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', deferred, NaN, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', deferred, 3, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', deferred, [], 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', deferred, {}, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', deferred, true, 5000); }).to.throw(TypeError);
            expect(function () { return someAreq.register('x', deferred, new Date(), 5000); }).to.throw(TypeError);

            expect(function () { return someAreq.register('x', deferred, function () {}); }).not.to.throw(TypeError);
            expect(function () { return someAreq.register('x', deferred, function () {}, 5000); }).not.to.throw(TypeError);
        });
   

   });

   describe('#.deregister', function() {
        it('should be a function', function () {
            expect(someAreq.deregister).to.be.a('function');
        });

        it('should throw TypeError if input evt is not a string', function () {
            expect(function () { return someAreq.deregister(); }).to.throw(TypeError);
            expect(function () { return someAreq.deregister(undefined); }).to.throw(TypeError);
            expect(function () { return someAreq.deregister(null); }).to.throw(TypeError);
            expect(function () { return someAreq.deregister(NaN); }).to.throw(TypeError);
            expect(function () { return someAreq.deregister(3); }).to.throw(TypeError);
            expect(function () { return someAreq.deregister([]); }).to.throw(TypeError);
            expect(function () { return someAreq.deregister({}); }).to.throw(TypeError);
            expect(function () { return someAreq.deregister(true); }).to.throw(TypeError);
            expect(function () { return someAreq.deregister(new Date()); }).to.throw(TypeError);
            expect(function () { return someAreq.deregister(function () {}); }).to.throw(TypeError);
        });

        it('should not throw Error if input evt is a string', function () {
            expect(function () { return someAreq.deregister('xxx'); }).not.to.throw(Error);
            expect(function () { return someAreq.deregister('hello'); }).not.to.throw(Error);
        });
   });

   describe('#.resolve', function() {
        it('should be a function', function () {
            expect(someAreq.resolve).to.be.a('function');
        });

        it('should throw TypeError if input evt is not a string', function () {
            expect(function () { return someAreq.resolve(undefined, 1); }).to.throw(TypeError);
            expect(function () { return someAreq.resolve(null, 1); }).to.throw(TypeError);
            expect(function () { return someAreq.resolve(NaN, 1); }).to.throw(TypeError);
            expect(function () { return someAreq.resolve(3, 1); }).to.throw(TypeError);
            expect(function () { return someAreq.resolve([], 1); }).to.throw(TypeError);
            expect(function () { return someAreq.resolve({}, 1); }).to.throw(TypeError);
            expect(function () { return someAreq.resolve(true, 1); }).to.throw(TypeError);
            expect(function () { return someAreq.resolve(new Date(), 1); }).to.throw(TypeError);
            expect(function () { return someAreq.resolve(function () {}, 1); }).to.throw(TypeError);
        });

        it('should not throw Error if input evt is a string', function () {
            expect(function () { return someAreq.resolve('xxx', 1); }).not.to.throw(Error);
            expect(function () { return someAreq.resolve('hello', 1); }).not.to.throw(Error);
        });
   });

   describe('#.reject', function() {
        it('should be a function', function () {
            expect(someAreq.reject).to.be.a('function');
        });

        it('should throw TypeError if input evt is not a string', function () {
            expect(function () { return someAreq.reject(undefined, 1); }).to.throw(TypeError);
            expect(function () { return someAreq.reject(null, 1); }).to.throw(TypeError);
            expect(function () { return someAreq.reject(NaN, 1); }).to.throw(TypeError);
            expect(function () { return someAreq.reject(3, 1); }).to.throw(TypeError);
            expect(function () { return someAreq.reject([], 1); }).to.throw(TypeError);
            expect(function () { return someAreq.reject({}, 1); }).to.throw(TypeError);
            expect(function () { return someAreq.reject(true, 1); }).to.throw(TypeError);
            expect(function () { return someAreq.reject(new Date(), 1); }).to.throw(TypeError);
            expect(function () { return someAreq.reject(function () {}, 1); }).to.throw(TypeError);
        });

        it('should not throw Error if input evt is a string', function () {
            expect(function () { return someAreq.reject('xxx', 1); }).not.to.throw(Error);
            expect(function () { return someAreq.reject('hello', 1); }).not.to.throw(Error);
        });
   });
});

describe('APIs Functional Checks', function() {
    var testEvent1 = 'test_event1',
        testEvent2 = 'test_event2',
        noSuchEvent = 'no_such_event';

    var areqApi1 = function (callback) {
        var deferred = Q.defer();

        someAreq.register(testEvent1, deferred, function () {
            someAreq.resolve(testEvent1, 'hello');
        }, 10000);

        return deferred.promise.nodeify(callback);
    };


    var areqApi2 = function (callback) {
        var deferred = Q.defer();

        someAreq.register(testEvent2, deferred, function () {
            someAreq.resolve(testEvent2, 'hello');
        }, 10000);

        return deferred.promise.nodeify(callback);
    };

    it('should not has the test_event1 pending', function () {
        expect(someAreq.isEventPending(testEvent1)).to.be.false;
    });

    it('should not has the test_event1 record', function () {
        expect(someAreq.getRecord(testEvent1)).to.be.undefined;
    });

    it('should has the test_event1 pending and its record after areqApi1() invoked', function () {
        areqApi1();
        expect(someAreq.isEventPending(testEvent1)).to.be.true;
        expect(someAreq.getRecord(testEvent1)).not.to.be.undefined;
        expect(someAreq.getRecord(testEvent1)).to.be.eql(someAreq._pendings[testEvent1]);
    });

    it('should not has the no_such_event pending and its record after areqApi1() invoked', function () {
        expect(someAreq.isEventPending(noSuchEvent)).to.be.false;
        expect(someAreq.getRecord(noSuchEvent)).to.be.undefined;
    });

    it('should not has the test_event pending and its record after deregister() invoked', function () {
        someAreq.deregister(testEvent1);
        expect(someAreq.isEventPending(testEvent1)).to.be.false;
        expect(someAreq.getRecord(testEvent1)).to.be.undefined;
    });

    it('should has the test_event2 pending and its record after areqApi2() invoked', function () {
        areqApi2();
        expect(someAreq.isEventPending(testEvent2)).to.be.true;
        expect(someAreq.getRecord(testEvent2)).not.to.be.undefined;
        expect(someAreq.getRecord(testEvent2)).to.be.eql(someAreq._pendings[testEvent2]);
    });

    it('should  not has the test_event2 pending and its record after areqApi2() resolved', function () {
        someAreq.resolve(testEvent2, 'hi');
        expect(someAreq.isEventPending(testEvent2)).to.be.false;
        expect(someAreq.getRecord(testEvent2)).to.be.undefined;
    });

    it('should not has the test_event1 pending and its record after areqApi1() rejected', function () {
        areqApi1();
        someAreq.reject(testEvent1, 'hi');
        expect(someAreq.isEventPending(testEvent1)).to.be.false;
        expect(someAreq.getRecord(testEvent1)).to.be.undefined;
    });

    it('check resolved value for areqApi1()', function () {
        areqApi1().done(function (v) {
            expect(v).to.be.eql('hello world');
        });

        expect(someAreq.isEventPending(testEvent1)).to.be.true;
        expect(someAreq.getRecord(testEvent1)).not.to.be.undefined;

        someAreq.resolve(testEvent1, 'hello world');

        expect(someAreq.isEventPending(testEvent1)).to.be.false;
        expect(someAreq.getRecord(testEvent1)).to.be.undefined;
    });

    it('check rejected value for areqApi2()', function () {
        areqApi2().fail(function (v) {
            expect(v).to.be.eql('fails');
        }).done();

        expect(someAreq.isEventPending(testEvent2)).to.be.true;
        expect(someAreq.getRecord(testEvent2)).not.to.be.undefined;

        someAreq.reject(testEvent2, 'fails');

        expect(someAreq.isEventPending(testEvent2)).to.be.false;
        expect(someAreq.getRecord(testEvent2)).to.be.undefined;
    });
});
