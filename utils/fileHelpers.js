const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.json');

// Helper function to read data from the file
const readData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data))
            }
        });
    })
};

// Helper function to write data to the file
const writeData = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8', err => {
            if (err) {
                reject(err);
            }
            else {
                resolve()
            }})
        });
    }

    module.exports = {
        readData,
        writeData
    }