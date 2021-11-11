const { expect } = require("chai")
const { describe } = require("mocha");

const { execute } = require("../src/Scheduler");
const { mockResolveAsync, mockRejectAsync } = require("./Mock");

describe('execute tasks', function () {
    var count

    it('if it passes, it attempts once', async function () {
        count = await execute(mockResolveAsync)
        expect(count).equal(1)

    })

    it('if it fails, it attempts FOUR more times', async function () {
        count = await execute(mockRejectAsync)
        expect(count).equal(5)
    })

})


