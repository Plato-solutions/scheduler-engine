const { expect } = require("chai")
const { describe } = require("mocha");
const { schedule } = require("../src/Scheduler");


describe('schedule function', function () {
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

        result = schedule("* * * * *", promise)
        expect(result).is.a("promise")
    })

})

