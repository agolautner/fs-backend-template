// const logger = (req, res, next) => {
//     console.log('logging...');
//     next();
// }

// module.exports = logger

exports.logger = (req, res, next) => {
    console.log('logging...');
    next();
}