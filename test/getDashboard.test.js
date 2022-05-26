const app = require('../app');
const mockServer = require('supertest')
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const User = require('../model/user')

test('new user gets an empty array', async () => {
    // given 
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const connection = await mongoose.connect(uri);

    const newUser = new User({ username: 'some_guy', googleId: '324233245' });
    const client = mockServer.agent(app);
    await newUser.save();
    client.set('authorization', newUser._id)
    
    // when
    const response = await client.get('/api/dashboards');
    
    // then
    expect(response.status).toBe(200);
    const responseData = response.body;

    expect(responseData.user.dashboards).toStrictEqual([]);

    await connection.disconnect();
    await mongod.stop();
});