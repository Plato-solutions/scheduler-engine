var retry = require('@lifeomic/attempt').retry
var Scheduler = require('async-scheduler').Scheduler
var cron = require('node-cron')

let scheduler = new Scheduler(1); // just 1 task at a time

var retryOptions = {
    delay: 200, // delay execution of retry by 5 seconds
    factor: 2, // multiply delay time by 2 upon each failure: wait longer before trying again
    maxAttempts: 4, // limit the number of retries upon failure
}

/**
 * executes the task once, immediately
 * @param {function} task - function that returns a promise
 * @returns { any } result - anything task() returns
 */
function execute(task) {
    return scheduler.enqueue(() => {
        return retry(task, retryOptions)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error;
            })
    })
}

/**
 * waits until time/interval and executes the task
 * @param { function } task - a function that returns a promise
 * @param { string } when - a cron string
 * @param { object } options - an object with retry options
 * @returns ScheduledTask
 */
function schedule(task, when, options = retryOptions) {

    retryOptions = options;

    const scheduledTask = cron.schedule(when, () => {
        scheduler.waitForIdle().then(
            execute(task)
        )
    })

    return scheduledTask
}

module.exports.schedule = schedule
module.exports.execute = execute