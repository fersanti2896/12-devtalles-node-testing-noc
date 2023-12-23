import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { LogRepository } from '../../../../src/domain/repository/log.repository';
import { SendEmailLogs } from './../../../../src/domain/use-cases/email/send-email-logs';

describe('Test in the send-email-logs.ts', () => { 
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue( true )        
    }

    const mockRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockRepository
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call sendEmail and saveLog.', async() => { 
        const result = await sendEmailLogs.execute('fersanti2896@gmail.com');

        expect( result ).toBeTruthy();
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
        expect( mockRepository.saveLog ).toHaveBeenCalledWith( expect.any( LogEntity ) );
        expect( mockRepository.saveLog ).toHaveBeenCalledWith({
            createdAt: expect.any( Date ), 
            level: "low", 
            message: "Log email sent.", 
            origin: "send-email-logs.ts"
        });
    });

    test('should log in case of error.', async() => { 
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue( false );

        const result = await sendEmailLogs.execute('fersanti2896@gmail.com');

        expect( result ).toBe(false);
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
        expect( mockRepository.saveLog ).toHaveBeenCalledWith( expect.any( LogEntity ) );
        expect( mockRepository.saveLog ).toHaveBeenCalledWith({
            createdAt: expect.any( Date ), 
            level: "high", 
            message: "Error: Email log not sent.", 
            origin: "send-email-logs.ts"
        });
    });
})