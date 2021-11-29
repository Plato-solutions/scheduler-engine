const { expect } = require("chai")
const { describe } = require("mocha");
const sinon = require("sinon");

const { execute, schedule } = require("../src/Scheduler");

describe('execute tasks', function () {

    it('if it passes, it attempts once', async function () {
        const spy = sinon.spy()

        await execute(() => {
            return new Promise((resolve, reject) => {
                spy()
                resolve()
            })
        })

        expect(spy.calledOnce).is.true
    })

    it('if it fails, it attempts four times', async function () {
        const spy = sinon.spy()

        await execute(() => {
            return new Promise((resolve, reject) => {
                spy()
                reject()
            })
        })

        expect(spy.callCount).equal(4)
    })

    it('schedule runs repeatedly', async function () {
        schedule(() => {
            return new Promise((resolve, reject) => {
                console.log("executes task")
                resolve(true)
            })
        }, "*/2 * * * * *")
    })

})


