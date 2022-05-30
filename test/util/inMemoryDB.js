const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
// const newUser = new User({ username: 'some_guy', googleId: '324233245' });
// await newUser.save();

const startDB = async () => {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const connection = await mongoose.connect(uri);
    return [ connection, mongod ]
}

const stopDB = async (connection, server) => {
    await connection.disconnect();
    await server.stop();
}

const deleteAll = async (...collections) => {
    // for (const c of collections) {
    //     await c.deleteMany()
    // }

    const promises = collections.map((c, i) => c.deleteMany());
    await Promise.all(promises);
}

module.exports = {startDB, stopDB, deleteAll};