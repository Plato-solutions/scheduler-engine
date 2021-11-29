const { expect } = require("chai")
const { describe } = require("mocha");

const { execute, schedule } = require("../src/Scheduler");
const { mockResolveAsync, mockRejectAsync } = require("./Mock");

describe('execute tasks', function () {
    var count

    it('if it passes, it attempts once', async function () {
        schedule(() => {
            return new Promise((resolve, reject) => {
                console.log("executes task")
                resolve(true)
            })
        }, "*/2 * * * * *")
    })

    it('if it fails, it attempts FOUR more times', async function () {
        count = await execute(mockRejectAsync)
        expect(count).equal(4)
    })

})


