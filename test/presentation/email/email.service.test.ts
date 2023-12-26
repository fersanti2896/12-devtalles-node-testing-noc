import nodemailer from 'nodemailer';
import { EmailService, SeendMailOptions } from '../../../src/presentation/email/email.service';


describe('Test in the email.service.ts', () => { 
    const mockSendMail = jest.fn();

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })

    const emailService = new EmailService();

    test('should send email.', async() => { 
        const options: SeendMailOptions = {
            to: 'fersanti2896@gmail.com',
            subject: 'Test',
            htmlBody: `<h1>Test</h1>`,
            attachements: []
        }

        await emailService.sendEmail( options );

        expect( mockSendMail ).toHaveBeenCalledWith({
            attachments: [],
            html: `<h1>Test</h1>`,
            subject: 'Test',
            to: 'fersanti2896@gmail.com'            
        })
    });

    test('should send email with attachements.', async() => {   
        await emailService.sendEmailWithFileSystemLogs('fersanti2896@gmail.com');

        expect( mockSendMail ).toHaveBeenCalledWith({
            to: 'fersanti2896@gmail.com',
            subject: 'Logs del servidor',
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
            ])
        });
    });
});