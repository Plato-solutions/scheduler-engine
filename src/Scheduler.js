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
            .then((result) => console.log(result))
            .catch((error) => console.log("gave up" + error))
    })

}


function schedule(interval, promise, options = retryOptions) {

    retryOptions = options;

    const scheduledTask = cron.schedule(interval, () => {
        console.log("enqueing promise")
        enqueue(promise)
    })

    return new Promise((resolve, reject) => {
        if(scheduledTask) resolve(scheduledTask)
        else reject(null)
    })
}

module.exports.schedule = schedule
module.exports.enqueue = enqueue