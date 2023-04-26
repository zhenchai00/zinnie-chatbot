const fs = require('fs');

/**
 * This is to get the current datetime in utc format
 * @returns {string} datetime in utc format
 */
exports.getDateTime = () => {
    let dateObj = new Date;
    let date = dateObj.toISOString().split('T');

    return date[0] + ' ' + date[1];
}

/**
 * This is the temp logging 
 */
exports.logger = (text) => {
    let date = this.getDateTime();
    let log = `${date} ${text} \n`;
    fs.appendFile('./logs/app.log', log, (err) => {
        if (err) console.log(err);
    });
}