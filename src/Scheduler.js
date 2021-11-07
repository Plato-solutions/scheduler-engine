var retry = require('@lifeomic/attempt').retry
var Scheduler = require('async-scheduler').Scheduler
var cron = require('node-cron')

let scheduler = new Scheduler(1); // just 1 task at a time

var retryOptions = {
    delay: 200, // delay execution of retry by 5 seconds
    factor: 2, // multiply delay time by 2 upon each failure: wait longer before trying again
    maxAttempts: 4, // limit the number of retries upon failure
}

async function enqueue(task) {
    await scheduler.waitForIdle()

    scheduler.enqueue(async () => {
        retry(task, retryOptions)
            .then((x) => console.log(x))
            .catch(() => console.log("gave up"))
    })

}


function schedule(interval, promise, options = retryOptions) {

    retryOptions = options;

    cron.schedule(interval, () => {
        console.log("enqueing promise")
        enqueue(promise)
    })

    return new Promise((resolve, reject) => {
        
    })
}

module.exports.schedule = schedule