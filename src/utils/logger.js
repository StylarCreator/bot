const chalk = require('chalk');

module.exports = async function log(message, error) {
    if(error === true) {
        return console.log(`${chalk.bold(chalk.red(`Stylar`))} >> ${chalk.italic(`${message}`)}`);
    } else {
        return console.log(`${chalk.bold(chalk.blue(`Stylar`))} >> ${chalk.italic(`${message}`)}`);
    }
}