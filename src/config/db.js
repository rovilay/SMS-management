/* eslint no-console: 0 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbURL = process.env.DB_URL;
const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connection Established');
});

db.on('reconnected', () => {
    console.log('Connection Reestablished');
});

db.on('disconnected', () => {
    console.log('Connection Disconnected');
});

db.on('close', () => {
    console.log('Connection Closed');
});

db.once('open', () => console.log('mongoDb is connected!'));
db.on('error', console.error.bind(console, 'connection error:'));

const runDB = async () => {
    try {
        await mongoose.connect(dbURL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            autoReconnect: true,
            reconnectTries: 1000000,
            reconnectInterval: 3000
        });
    } catch (error) {
        console.error(error);
    }
};


export default runDB;
