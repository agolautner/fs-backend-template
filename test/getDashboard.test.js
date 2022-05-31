const app = require('../app');
const mockServer = require('supertest')
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { startDB, stopDB, deleteAll } = require('./util/inMemoryDB');

const User = require('../models/user')

describe('/api/dashboards/ get tests', () => {

    let connection;
    let server;
    let client;

    beforeAll(async () => {
        [ connection, server ] = await startDB();
        client = mockServer.agent(app);
    });

    afterEach(async () => {
        await deleteAll(User);
    });

    afterAll(async () => {
        await stopDB(connection, server);
    })

    test('new user gets an empty array', async () => {
        // given
        const newUser = new User({ username: 'some_guy', googleId: '324233245' });
        await newUser.save();
        client.set('authorization', newUser._id)
        
        // when
        const response = await client.get('/api/dashboards');
        
        // then
        const responseData = response.body;
        expect(response.status).toBe(200);
        expect(responseData.user.dashboards).toStrictEqual([]);
    });

    test('deleted user receives nothing', async () => {
        // given     
        const newUser = new User({ username: 'some_guy', googleId: '324233245' });
        await newUser.save();
        client.set('authorization', newUser._id)
        await User.deleteMany();

        // when
        const response = await client.get('/api/dashboards');
        
        // then
        const responseData = response.body;
        expect(response.status).toBe(200);
        expect(responseData.user).toBeNull();
    });


    //other test cases here
})