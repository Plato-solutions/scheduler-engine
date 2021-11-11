var retryCount = 0

count = 0

module.exports.mockRejectAsync = () => {
    return new Promise((resolve, reject) => {
        count++
        reject(count)
    })
}

module.exports.mockResolveAsync = () => {
    return new Promise((resolve, reject) => {
        count++
        resolve(count)
    })
}

module.exports.mockResolveTask = () => {
    mockPromise = this.mockResolveAsync()

    mockPromise
        .catch((err) => {
            return err
        })

    return mockPromise
}

module.exports.mockRejectTask = () => {
    mockPromise = this.mockRejectAsync()

    mockPromise
        .catch((err) => {
            retryCount++
        })

    return mockPromise
}

