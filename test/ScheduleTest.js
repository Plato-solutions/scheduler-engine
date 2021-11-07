const { expect } = require("chai")
const { describe } = require("mocha");
const { schedule } = require("../src/Scheduler");

describe('run a passing task', function () {
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

    it('executes on interval', async function () {
        // TODO write this test
        expect(true).equals(false, "empty test")
    })

})

