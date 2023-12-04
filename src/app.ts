import 'dotenv/config'
import { Server } from './presentation/server';
import { LogModel, MongoDatabase } from './data/mongo';
import { envs } from './config/plugins/envs.plugin';
import { PrismaClient } from '@prisma/client';

(async() => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });
    
    /* Crear un registro */
    // const newLog = await LogModel.create({
    //     message: 'Test message from Mongo 5',
    //     origin: 'App.ts',
    //     level: 'low'
    // });

    // await newLog.save();

    // const logs = await LogModel.find();
    // console.log({ logs })

    Server.start();  
    
    // const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test message',
    //         origin: 'App.ts'
    //     }
    // });

    // const logs = await prisma.logModel.findMany();

    // console.log(logs)
}