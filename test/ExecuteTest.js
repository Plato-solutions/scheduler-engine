const { expect } = require("chai")
const { describe } = require("mocha");
const { schedule, execute } = require("../src/Scheduler");

const { mockResolveTask, mockRejectTask } = require("./Mock")

describe('execute tasks', function () {
    var count

    it('if it passes, it attempts once', async function () {
        count = await execute(mockResolveTask)
        expect(count).equal(1)

    })

    it('if it fails, it attempts FOUR more times', async function () {
        count = await execute(mockRejectTask)
        expect(count).equal(5)
    })

})

