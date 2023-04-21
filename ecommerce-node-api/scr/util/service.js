const Config = {
    pagination: 4,
}

const isEmptyorNull = (value) => {
    if (value == "" || value == null || value == "null") {
        return true
    }
    return false
}

module.exports = {
    Config,
    isEmptyorNull
}