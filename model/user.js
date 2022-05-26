const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true}, // "" should not be enough
    description: {type: String, required: true}, //"" is enough
    isDone: {type: Boolean, required: true, default: false},
})

const dashboardSchema = new mongoose.Schema({
    title: {type: String, required: true}, // "" should not be enough
    todos: [todoSchema] // default empty list? 
})

const userSchema = new mongoose.Schema({ //authenticateToken, 
    username: {type: String, unique: true, required: true}, // "" should not be enough !!!!!NEEDS TO BE UNIQUE    
    googleId: {type: String, unique: true, required: true}, // "" should not be enough + validation !!!!!NEEDS TO BE UNIQUE  
    // email: {type: String, unique: true, required: true}, // "" should not be enough + validation !!!!!NEEDS TO BE UNIQUE  
    // password: {type: String, required: true}, // "" should not be enough! + validation
    dashboards: [dashboardSchema] // default empty list? 
})

const User = mongoose.model('User', userSchema);

module.exports = User;