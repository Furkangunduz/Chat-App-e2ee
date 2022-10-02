const divideStringByLength = (str, length) => {
    let messagesArray = []
    while (true) {
        if (str.length <= length) {
            messagesArray.push(str.substring(0, str.length));
            break;
        }
        messagesArray.push(str.substring(0, length));
        str = str.substring(length);
    }
    return messagesArray
}

module.exports = { divideStringByLength }