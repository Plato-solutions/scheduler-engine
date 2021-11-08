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
// execute doSomething every 6 seconds
schedule("*/6 * * * * *", doSomething)
```

### Example

```javascript
const schedule = require("./src/Scheduler").schedule;

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

// execute doSomething every 6 seconds
schedule("*/6 * * * * *", doSomething)
```


## Cron Syntax

This is a quick reference to cron syntax and also shows the options supported by node-cron.

### Allowed fields

```
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
```

### Allowed values

|     field    |        value        |
|--------------|---------------------|
|    second    |         0-59        |
|    minute    |         0-59        |
|     hour     |         0-23        |
| day of month |         1-31        |
|     month    |     1-12 (or names) |
|  day of week |     0-7 (or names, 0 or 7 are sunday)  |


#### Using multiples values

You may use multiples values separated by comma:

```javascript
var cron = require('node-cron');

cron.schedule('1,2,4,5 * * * *', () => {
  console.log('running every minute 1, 2, 4 and 5');
});
```

#### Using ranges

You may also define a range of values:

```javascript
var cron = require('node-cron');

cron.schedule('1-5 * * * *', () => {
  console.log('running every minute to 1 from 5');
});
```

#### Using step values

Step values can be used in conjunction with ranges, following a range with '/' and a number. e.g: `1-10/2` that is the same as `2,4,6,8,10`. Steps are also permitted after an asterisk, so if you want to say “every two minutes”, just use `*/2`.

```javascript
var cron = require('node-cron');

cron.schedule('*/2 * * * *', () => {
  console.log('running a task every two minutes');
});
```

#### Using names

For month and week day you also may use names or short names. e.g:

```javascript
var cron = require('node-cron');

cron.schedule('* * * January,September Sunday', () => {
  console.log('running on Sundays of January and September');
});
```

Or with short names:

```javascript
var cron = require('node-cron');

cron.schedule('* * * Jan,Sep Sun', () => {
  console.log('running on Sundays of January and September');
});
```

## cron tool online

 - [quick and simple cron schedule expression editor](https://crontab.guru/)

