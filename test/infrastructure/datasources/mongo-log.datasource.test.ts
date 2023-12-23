import mongoose from 'mongoose';
import { MongoLogDataSource } from '../../../src/infrastructure/datasources/mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { MongoDatabase } from '../../../src/data/mongo/init';
import { envs } from '../../../src/config/plugins/envs.plugin';
import { LogModel } from '../../../src/data/mongo';

describe('Test in the mongo-log.datasource.ts', () => { 
    beforeAll(async() => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        });
    });

    afterEach(async() => {
        await LogModel.deleteMany();
    })

    afterAll(async() => {
        mongoose.connection.close();
    });

    const logDataSource = new MongoLogDataSource();

    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test-message',
        origin: 'mongo-log.datasource.test.ts'
    });


    test('should create a log.', async() => { 
        const logSpy = jest.spyOn(console, 'log');

        await logDataSource.saveLog(log); 

        expect( logSpy ).toHaveBeenCalled();
        expect( logSpy ).toHaveBeenCalledWith("Mongo Log created: ", expect.any(String));
    });

    test('should get logs.', async() => { 
        await logDataSource.saveLog(log);

        const logs = await logDataSource.getLogs( LogSeverityLevel.medium );

        expect( logs.length ).toBe(1);
        expect( logs[0].level ).toBe( LogSeverityLevel.medium );
    });
})