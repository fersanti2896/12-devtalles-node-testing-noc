import { envs } from './../../../src/config/plugins/envs.plugin';

describe('Test in the envs.plugin.ts', () => { 
    test('should return env options.', () => { 
        expect( envs ).toEqual({
            PORT: 5796,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'fersanti2896@gmail.com',
            MAILER_SECRET_KEY: 'fwgrnfrgrmpjhhrv',
            PROD: true,
            MONGO_URL: 'mongodb://fersanti:un1fac96@localhost:27017',
            MONGO_DB_NAME: 'NOC_TEST',
            MONGO_USER: 'fersanti',
            MONGO_PASS: 'un1fac96'
        })
    });

    test('should return error if not found env.', async() => { 
        jest.resetModules();

        process.env.PORT = 'ABC'

        try {
            await import('../../../src/config/plugins/envs.plugin')
            expect( true ).toBe( false );
        } catch (error) {
            expect( `${error}` ).toContain('"PORT" should be a valid integer');
        }
    })
})