# Scheduler Engine

Executes tasks at specified intervals, returns a promise
A tool that allows you to set tasks and their schedules then executes tasks at specified times/intervals.

## Usage
Pass the task you want to be performed as a promise and set the time/interval using a cron-style string.

```javascript
function doSomething() {
  somePromise.then(
    // do something
  ).catch(
    // do something
  )
  return somePromise;
}
schedule("*/6 * * * * *", doSomething)
```

### Example

```javascript
const schedule = require("./src/Scheduler").schedule;

var retryCount = 1

function fakeFetch() {
    return new Promise((resolve, reject) => {
        console.log("fetching...")
        reject("could not fetch")
    })

}

function doSomething() {
    fetchPromise = fakeFetch()

    fetchPromise
        .then((data) => console.log("log " + data))
        .catch((err) => {
            console.log("err " + err + "count " + retryCo
        })

    return fetchPromise
}

schedule("*/6 * * * * *", doSomething)
```