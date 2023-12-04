
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SeendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements: Attachement[];
}

interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    constructor() {}

    async sendEmail(options: SeendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachements } = options;
        try {
            const sentInformation = await this.transporter.sendMail({
                to: to, 
                subject: subject,
                html: htmlBody,
                attachments: attachements
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    async sendEmailWithFileSystemLogs( to: string | string[] ) {
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logo del sistema - NOC</h3>
            <p>Es un correo de prueba desde NOC</p>
        `
        const attachements: Attachement[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
        ];

        return this.sendEmail({ to, subject, attachements, htmlBody })
    }
}