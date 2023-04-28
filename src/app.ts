import express from  'express';
import path from  'path';
import cookieParser from  'cookie-parser';
import logger from  'morgan';

import { errorHandler, errorNotFoundHandler } from "./middleware/errorHandler";

import usersRouter from './routes/users';
import networkcallRouter from './routes/networkcall';
import dbcallRouter from './routes/db';

export const app = express();

// view engine setup'
app.set("port", process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/networkcall', networkcallRouter);
app.use('/db', dbcallRouter);

app.use(errorNotFoundHandler);
app.use(errorHandler);
