/* eslint no-console: 0 */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './routes';
import runDB from './config/db';

dotenv.config();

const { PORT = 5555 } = process.env;

const app = express();
runDB(); // initialize database connection

app.use(cors());
app.use(bodyParser.json());

// init routes
routes(app);

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});

export default app;
