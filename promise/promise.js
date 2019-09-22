function Promise(executor) {
    let self = this; //先缓存当前promise实例
    self.status = PENDING;//设置状态
    //定义存放成功的回调的数组
    self.onResolvedCallbacks = [];
    //定义存放失败回调的数组
    self.onRejectedCallbacks = [];
    //当调用此方法的时候，如果promise状态为pending,的话可以转成成功态,如果已经是成功态或者失败态了，则什么都不做

    //2.1 定义resolve方法;
    function resolve(value) {
        if (value != null && value.then && typeof value.then == 'function') {
            return value.then(resolve, reject);
        }
        //如果是初始态，则转成成功态
        //为什么要把它用setTimeout包起来
        setTimeout(function () {
            if (self.status == PENDING) {
                self.status = FULFILLED;
                self.value = value;//成功后会得到一个值，这个值不能改
                //调用所有成功的回调
                self.onResolvedCallbacks.forEach(cb => cb(self.value));
            }
        })
    }
    //2.1.2 定义reject方法;
    function reject(reason) {
        setTimeout(function () {
            //如果是初始态，则转成失败态
            if (self.status == PENDING) {
                self.status = REJECTED;
                self.value = reason;//失败的原因给了value
                self.onRejectedCallbacks.forEach(cb => cb(self.value));
            }
        });
    }
    try {
        //因为此函数执行可能会异常，所以需要捕获，如果出错了，需要用错误 对象reject
        executor(resolve, reject);
    } catch (e) {
        //如果这函数执行失败了，则用失败的原因reject这个promise
        reject(e);
    };
}

//onFulfilled 是用来接收promise成功的值或者失败的原因
Promise.prototype.then = function (onFulfilled, onRejected) {
    //如果成功和失败的回调没有传，则表示这个then没有任何逻辑，只会把值往后抛
    //2.2.1
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : function (value) { return value };
    onRejected = typeof onRejected == 'function' ? onRejected : reason => { throw reason };
    //如果当前promise状态已经是成功态了，onFulfilled直接取值
    let self = this;
    let promise2;
    if (self.status == FULFILLED) {
        return promise2 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    let x = onFulfilled(self.value);
                    //如果获取到了返回值x,会走解析promise的过程
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    //如果执行成功的回调过程中出错了，用错误原因把promise2 reject
                    reject(e);
                }
            })

        });
    }
    if (self.status == REJECTED) {
        return promise2 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    let x = onRejected(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            })
        });
    }
    if (self.status == PENDING) {
        return promise2 = new Promise(function (resolve, reject) {
            self.onResolvedCallbacks.push(function () {
                try {
                    let x = onFulfilled(self.value);
                    //如果获取到了返回值x,会走解析promise的过程
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }

            });
            self.onRejectedCallbacks.push(function () {
                try {
                    let x = onRejected(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });

    }
}