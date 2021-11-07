const { expect } = require("chai")
const { describe } = require("mocha");
const { schedule } = require("../src/Scheduler");

describe('the function', function () {
    it('returns a promise', async function () {
        const promise = new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    console.log("test")
                    resolve(true)
                },
                500
            );
        })

        var schedulePromise = schedule("* * * * *", promise)
        // (await scheduledTask).stop()
        expect(schedulePromise).is.a("promise")

        scheduleTask = await schedulePromise
        scheduleTask.stop()

    })
})