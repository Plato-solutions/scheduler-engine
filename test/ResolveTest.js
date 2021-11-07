const { expect } = require("chai")
const { describe } = require("mocha");
const { schedule } = require("../src/Scheduler");

describe('run a passing task', function () {
    var retryCount = 1

    function fakeFetch() {
        return new Promise((resolve, reject) => {
            resolve("fetched successfully")
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

    it('attempted once', async function () {
        // TODO write this test
        expect(true).equals(false, "empty test")
    })

})

