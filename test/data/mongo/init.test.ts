import mongoose from 'mongoose';
import { MongoDatabase } from './../../../src/data/mongo/init';

describe('Test in the init.ts', () => { 
    afterAll(() => {
        mongoose.connection.close();
    })

    test('should connect to MongoDB', async() => { 
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        });

        expect( connected ).toBe( true );
    });

    test('should throw an error.', async() => { 
        try {
            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: 'mongodb://fersanti:un1fac96@localhosssst:27017'
            });

            expect( true ).toBe( false );
        } catch (error) {
            
        }
    });
})