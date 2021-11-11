var count =  0

module.exports.mockRejectAsync = () => {
    return new Promise((_, reject) => {
        count = count + 1
        reject(count)
    })
}

module.exports.mockResolveAsync = () => {
    return new Promise((resolve, _) => {
        count = count + 1
        resolve(count)
    })
}

module.exports.mockResolveTask = () =>  {
    mockPromise = mockResolveAsync()

    mockPromise
        .catch((err) => {
            return err
        })

    return mockPromise
}

module.exports.mockRejectTask = () =>  {
    mockPromise = mockRejectAsync()

    mockPromise
        .catch((err) => {
            count++
        })

    return mockPromise
}

