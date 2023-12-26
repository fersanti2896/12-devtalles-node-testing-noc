import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogRepositoryImpl } from '../../../src/infrastructure/repositories/log.repository.impl';

describe('Test in the log.repository.ts', () => { 
    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const logRepository = new LogRepositoryImpl(mockLogDatasource);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('saveLog should call the datasource.', async() => { 
        const log = { level: LogSeverityLevel.high, message: 'Prueba' } as LogEntity;
    
        await logRepository.saveLog(log);

        expect( mockLogDatasource.saveLog ).toHaveBeenCalledWith( log );
    });

    test('getLogs should call the datasource with arguments.', async() => { 
        const lowSeverity = LogSeverityLevel.low;

        await logRepository.getLogs( lowSeverity );

        expect( mockLogDatasource.getLogs ).toHaveBeenCalledWith( lowSeverity )
    });
});