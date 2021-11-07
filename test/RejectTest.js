const { expect } = require("chai")
const { describe } = require("mocha");
const { enqueue } = require("../src/Scheduler");

describe('run a failing task', function () {

    function operation() {
        return new Promise((resolve, reject) => {
            reject("could not fetch")
        })
    }

    async function doSomething() {
        fetchPromise = operation()

        var retryCount = 0


        fetchPromise
            .catch((err) => {
                retryCount++
            })

        return await fetchPromise
    }

    it('retries 3 times on failure by default', async function () {
        // TODO write this test
        expect(true).equals(false, "empty test")

    })

    it('retries on failure with retry options', async function () {
        // TODO write this test
        expect(true).equals(false, "empty test")
    })
})