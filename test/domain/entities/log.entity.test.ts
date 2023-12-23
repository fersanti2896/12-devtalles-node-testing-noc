import { LogEntity, LogSeverityLevel } from './../../../src/domain/entities/log.entity';

describe('Test in the LogEntity', () => { 
    const dataObj = {
        message: 'Hola mundo',
        level: LogSeverityLevel.high,
        origin: 'log.entity.test.ts'
    };

    test('should create a LogEntity instance.', () => { 
        
        const log = new LogEntity(dataObj);

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( dataObj.message );
        expect( log.level ).toBe( dataObj.level );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.createdAt ).toBeInstanceOf( Date );
    });

    test('should create LogEntity instance fromJson.', () => { 
        const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2023-12-23T01:19:50.338Z","origin":"check-service.ts"}`;
        const log = LogEntity.fromJson( json );

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( "Service https://google.com working" );
        expect( log.level ).toBe( LogSeverityLevel.low );
        expect( log.origin ).toBe( "check-service.ts" );
        expect( log.createdAt ).toBeInstanceOf( Date );
    });

    test('should create a LogEntity instace from object.', () => { 
        const log = LogEntity.fromObject( dataObj );

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( dataObj.message );
        expect( log.level ).toBe( dataObj.level );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.createdAt ).toBeInstanceOf( Date );
    });
})