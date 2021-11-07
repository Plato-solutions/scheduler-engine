// TODO; FIX RETRY NOT WORKING


var cron = require('node-cron')
var Scheduler = require('async-scheduler').Scheduler
var retry = require('@lifeomic/attempt').retry

let scheduler = new Scheduler(1); // just 1 task at a time

const defaultOptions = {
    delay: 200, // delay execution of retry by 5 seconds
    factor: 2, // multiply delay time by 2 upon each failure: wait longer before trying again
    maxAttempts: 4, // limit the number of retries upon failure
}

async function attemptPromise(promise) {
    console.log("awaiting promise")
    return await promise
}

async function enqueueRetry(promise) {

    console.log("waiting for idle...")
    await scheduler.waitForIdle()

    scheduler.enqueue(async () => {
        console.log("attempt retry")
        try {
            const result = await retry(async function () {
                console.log("retry promise")
                return promise
            }, {
                delay: 1000, // delay execution of retry by 5 seconds
                factor: 2, // multiply delay time by 2 upon each failure: wait longer before trying again
                maxAttempts: 5, // limit the number of retries upon failure
            });
        } catch (err) {
            // If the max number of attempts was exceeded then `err`
            // will be the last error that was thrown.
            //
            // If error is due to timeout then `err.code` will be the
            // string `ATTEMPT_TIMEOUT`.
            console.log("max 4 timeout")
            // return err;
        }
    })

}

async function enqueuePromise(promise) {

    console.log("waiting for idle...")
    await scheduler.waitForIdle()

    scheduler.enqueue(async () => {
        console.log("attempt promise")
        attemptPromise(promise)
        .catch(() => {
            console.log("promise error")
            enqueueRetry(promise)
        })
    })

}

function set(interval, promise, options = defaultOptions) {

    this.options = options;
    console.log("cron schedule")

    cron.schedule(interval, () => {
        console.log("enqueing promise")
        enqueuePromise(promise)
    })

    return new Promise((resolve, reject) => {

    })
}

module.exports.set = set