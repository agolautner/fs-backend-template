const errorHandler = (err, req, res, next) => {
    //4 bemeneti parameter eseteben az elso lesz az errorHandler!
    console.log(err);
    res.status(500).json('Something went wrong!');
}

module.exports = errorHandler