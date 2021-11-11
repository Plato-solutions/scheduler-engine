var retry = require('@lifeomic/attempt').retry
var Scheduler = require('async-scheduler').Scheduler
var cron = require('node-cron')

let scheduler = new Scheduler(1); // just 1 task at a time

var retryOptions = {
    delay: 200, // delay execution of retry by 5 seconds
    factor: 2, // multiply delay time by 2 upon each failure: wait longer before trying again
    maxAttempts: 4, // limit the number of retries upon failure
}

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