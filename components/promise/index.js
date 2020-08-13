const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function Promise(executor) {
  this.status = PENDING;
  this.value = undefined;
  this.fulfilledCallbacks = [];
  this.rejectedCallbacks = [];

  safelyExecute(this, executor);
}

function safelyExecute(self, executor) {
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.value = value;
      self.fulfilledCallbacks.forEach(func => func());
    }
  }
  function reject(value) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.value = value;
      self.rejectedCallbacks.forEach(func => func());
    }
  }
}

function promiseWrapper(self, onFulfilled, onRejected) {
  const promise2 = new Promise((resolve, reject) => {
    if (self.status !== PENDING) {
      const resolver = self.status === FULFILLED ? onFulfilled : onRejected;
      executeWrapper(resolver, resolve, reject);
    } else {
      self.fulfilledCallbacks.push(() => executeWrapper(onFulfilled, resolve, reject));
      self.rejectedCallbacks.push(() => executeWrapper(onRejected, resolve, reject));
    }
  });
  return promise2;

  function executeWrapper(resolver, resolve, reject) {
    // 2.2.4 onFulfilled and onRejected must execute asynchronously.
    // `then` returns before the promise becomes fulfilled or rejected already-fulfilled.
    setTimeout(() => {
      try {
        const x = resolver(self.value);
        resolvePromise(promise2, x, resolve, reject);
      } catch (error) {
        reject(error);
      }
    });
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error };

  return promiseWrapper(this, onFulfilled, onRejected);
}

function resolvePromise(promise2, x, resolve, reject) {
  // 2.3.1 If promise and x refer to the same object, reject promise with a TypeError as the reason.
  if (promise2 === x) {
    reject(new TypeError('Chaining cycle detected for promise'));
    return;
  }
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let called = false;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) {
            return;
          }
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, error => {
          if (called) {
            return;
          }
          called = true;
          reject(error);
        });
      } else {
        resolve(x);
      }
    } catch(e) {
      if (called) {
        return;
      }
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

const deferred = function () {
  const dfd = {};
  dfd.promise = new Promise(function (resolve, reject) {
      dfd.resolve = resolve;
      dfd.reject = reject;
  });
  return dfd;
};

module.exports = { deferred };