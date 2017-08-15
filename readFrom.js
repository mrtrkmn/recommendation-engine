const fs = require('fs');
const isUpperCase = require('is-upper-case');
let temporarySymbols = [];
let readData = new Promise(function (resolve, reject) {
    fs.readFile('/home/geek/Desktop/activity-logs.csv', 'utf8', (err, data) => {
        if (err)
            reject(err);

        let obj = {
            data: data,
            bankLogs: [],
            objectOfUsers: {},
            objectKeys: []
        };
        resolve(obj);
    });

});


readData.then(obj => {
    obj.bankLogs = splitString(obj.data, ';')
    for (let index = 2; index < obj.bankLogs.length; index += 5) {
        obj.objectOfUsers[obj.bankLogs[index]] = {}
        temporarySymbols.push(obj.bankLogs[index].concat(obj.bankLogs[index + 1]));
    }
    Object.keys(obj.objectOfUsers).forEach(function (element) {
        obj.objectKeys.push(element)
    });
    for (let index = 0; index < obj.objectKeys.length; index++)
        createObject(index, obj.objectOfUsers, obj.objectKeys);
    console.log(obj.objectOfUsers)
})
    .catch((err) => console.log('Error happened : ' + err));




function createObject(indexOfUsers, objectOfUsers, objectKeys) {
    let counter, tempSlicedValue, tempSlicedValue2;
    temporarySymbols.forEach(function (element) {
        tempSlicedValue = element.slice(0, element.indexOf('/'));
        tempSlicedValue2 = element.slice(tempSlicedValue.length + 9, element.indexOf('&'))
        if (tempSlicedValue === objectKeys[indexOfUsers] && isUpperCase(tempSlicedValue2) && tempSlicedValue2 !== '') {
            if (objectOfUsers[objectKeys[indexOfUsers]][tempSlicedValue2] === undefined) {
                counter = 1;
                objectOfUsers[objectKeys[indexOfUsers]][tempSlicedValue2] = counter;
            }
            else if (objectOfUsers[objectKeys[indexOfUsers]][tempSlicedValue2] !== undefined) {
                counter++;
                objectOfUsers[objectKeys[indexOfUsers]][tempSlicedValue2] = counter;
            }
        }

    })
}
function splitString(stringToSplit, separator) {
    let logs = [];
    let arrayOfStrings = stringToSplit.split(separator);
    arrayOfStrings.forEach(function (element) {
        logs.push(element)
    });
    return logs;
}

module.exports = {
    splitString,
}