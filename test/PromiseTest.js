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

describe('schedule a failing task', function () {
    var retryCount = 1
    var schedulePromise

    function fakeFetch() {
        return new Promise((resolve, reject) => {
            reject("could not fetch")
        })

    }

    async function doSomething() {
        fetchPromise = fakeFetch()

        fetchPromise
            .catch((err) => {
                retryCount++
            })

        return fetchPromise
    }

    before(() => {
        schedulePromise = schedule("*/1 * * * * *", doSomething)

    })

    after(() => {
        schedulePromise.then((scheduledTask) => scheduledTask.stop())
    })

    it('executes on interval', async function () {

        // enqueue(doSomething)
    })

    it('retries 3 times on failure', async function () {

        // enqueue(doSomething)
        // schedule("*/10 * * * * *", doSomething)
    })

    it('retries on failure with retry options', async function () {

        // enqueue(doSomething)
        // schedule("*/10 * * * * *", doSomething)
    })
})


describe('schedule a passing task', function () {
    var retryCount = 1
    var schedulePromise

    function fakeFetch() {
        return new Promise((resolve, reject) => {
            reject("could not fetch")
        })

    }

    async function doSomething() {
        fetchPromise = fakeFetch()

        fetchPromise
            .catch((err) => {
                retryCount++
            })

        return fetchPromise
    }

    before(() => {
        schedulePromise = schedule("*/1 * * * * *", doSomething)

    })

    after(() => {
        schedulePromise.then((scheduledTask) => scheduledTask.stop())
    })

    it('executes on interval', async function () {

        // enqueue(doSomething)
    })

    it('retries 3 times on failure', async function () {

        // enqueue(doSomething)
        // schedule("*/10 * * * * *", doSomething)
    })

    it('retries on failure with retry options', async function () {

        // enqueue(doSomething)
        // schedule("*/10 * * * * *", doSomething)
    })
})

